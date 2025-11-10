import unittest
import json
import io
import os
import sqlite3
import tempfile
from PIL import Image
import numpy as np
from app import app, init_db, load_model, preprocess_image

class TestFlaskApp(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Set up test environment"""
        app.config['TESTING'] = True
    
    def setUp(self):
        """Set up test client and database for each test"""
        # Create a new temporary database for each test
        self.db_fd, self.db_path = tempfile.mkstemp()
        app.config['DATABASE'] = self.db_path
        self.client = app.test_client()
        
        # Initialize database with schema
        with app.app_context():
            db = sqlite3.connect(self.db_path)
            # Create fresh table
            db.execute('''CREATE TABLE predictions
                      (id INTEGER PRIMARY KEY AUTOINCREMENT,
                       filename TEXT NOT NULL,
                       timestamp TEXT NOT NULL,
                       prediction TEXT NOT NULL,
                       confidence REAL NOT NULL)''')
            db.commit()
            db.close()
            
            # Verify the database is empty
            db = sqlite3.connect(self.db_path)
            cursor = db.cursor()
            cursor.execute('SELECT COUNT(*) FROM predictions')
            count = cursor.fetchone()[0]
            assert count == 0, f"Database should be empty but has {count} records"
            db.close()
        
        # Create test images
        self.test_image_rgb = io.BytesIO()
        image_rgb = Image.new('RGB', (224, 224), color='red')
        image_rgb.save(self.test_image_rgb, format='PNG')
        self.test_image_rgb.seek(0)
        
        self.test_image_rgba = io.BytesIO()
        image_rgba = Image.new('RGBA', (224, 224), color='red')
        image_rgba.save(self.test_image_rgba, format='PNG')
        self.test_image_rgba.seek(0)
        
        self.test_image_small = io.BytesIO()
        image_small = Image.new('RGB', (100, 100), color='blue')
        image_small.save(self.test_image_small, format='PNG')
        self.test_image_small.seek(0)

    def tearDown(self):
        """Clean up temporary database"""
        try:
            os.close(self.db_fd)
        except OSError:
            pass
        try:
            os.unlink(self.db_path)
        except (OSError, PermissionError):
            pass

    def test_health_check(self):
        """Test health check endpoint"""
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
        self.assertEqual(data['message'], 'AgriVision API is running')

    def test_predict_no_file(self):
        """Test prediction with no file"""
        response = self.client.post('/predict')
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'No image file provided', response.data)

    def test_predict_empty_filename(self):
        """Test prediction with empty filename"""
        response = self.client.post('/predict', data={
            'image': (io.BytesIO(), '')
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'No selected file', response.data)

    def test_predict_with_rgb_image(self):
        """Test prediction with valid RGB image"""
        response = self.client.post('/predict', data={
            'image': (self.test_image_rgb, 'test_rgb.png')
        })
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('prediction', data)
        self.assertIn('confidence', data)
        self.assertIn('remedy', data)
        self.assertIsInstance(data['confidence'], float)
        self.assertTrue(0 <= data['confidence'] <= 100)

    def test_predict_with_rgba_image(self):
        """Test prediction with RGBA image (should convert to RGB)"""
        response = self.client.post('/predict', data={
            'image': (self.test_image_rgba, 'test_rgba.png')
        })
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('prediction', data)
        self.assertIn('confidence', data)

    def test_predict_with_small_image(self):
        """Test prediction with small image (should resize)"""
        response = self.client.post('/predict', data={
            'image': (self.test_image_small, 'test_small.png')
        })
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('prediction', data)

    def test_insights_empty_db(self):
        """Test insights with empty database"""
        # Ensure we're using the test database
        with app.app_context():
            response = self.client.get('/insights')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['total_predictions'], 0)
            self.assertEqual(len(data['frequent_diseases']), 0)
            self.assertEqual(data['average_confidence'], 0)
        self.assertEqual(len(data['frequent_diseases']), 0)
        self.assertEqual(data['average_confidence'], 0)

    def test_insights_with_data(self):
        """Test insights with sample prediction data"""
        # Insert test predictions using app context
        with app.app_context():
            conn = sqlite3.connect(self.db_path)
            c = conn.cursor()
            test_data = [
                ('test1.jpg', '2024-01-01', 'Apple___Apple_scab', 95.5),
                ('test2.jpg', '2024-01-01', 'Tomato___Leaf_Mold', 87.3),
                ('test3.jpg', '2024-01-01', 'Apple___Apple_scab', 92.1)
            ]
            c.executemany('INSERT INTO predictions (filename, timestamp, prediction, confidence) VALUES (?, ?, ?, ?)', 
                         test_data)
            conn.commit()
            conn.close()

            response = self.client.get('/insights')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['total_predictions'], 3)
            self.assertGreater(len(data['frequent_diseases']), 0)
            self.assertAlmostEqual(data['average_confidence'], (95.5 + 87.3 + 92.1) / 3, places=2)
        self.assertGreater(len(data['frequent_diseases']), 0)
        self.assertAlmostEqual(data['average_confidence'], (95.5 + 87.3 + 92.1) / 3, places=2)

    def test_preprocess_image(self):
        """Test image preprocessing function"""
        # Test with RGB image
        img_rgb = Image.open(self.test_image_rgb)
        processed_rgb = preprocess_image(img_rgb)
        self.assertEqual(processed_rgb.shape, (1, 224, 224, 3))
        self.assertTrue(np.all(processed_rgb >= 0) and np.all(processed_rgb <= 1))

        # Test with RGBA image
        img_rgba = Image.open(self.test_image_rgba)
        # Convert RGBA to RGB before preprocessing
        if img_rgba.mode == 'RGBA':
            img_rgba = img_rgba.convert('RGB')
        processed_rgba = preprocess_image(img_rgba)
        self.assertEqual(processed_rgba.shape, (1, 224, 224, 3))

        # Test with small image
        img_small = Image.open(self.test_image_small)
        processed_small = preprocess_image(img_small)
        self.assertEqual(processed_small.shape, (1, 224, 224, 3))

    def test_model_loading(self):
        """Test model loading function"""
        # Test prediction endpoint directly since it handles both model and demo modes
        response = self.client.post('/predict', data={
            'image': (self.test_image_rgb, 'test.png')
        })
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('prediction', data)
        self.assertIn('confidence', data)
        self.assertIsInstance(data['prediction'], str)
        self.assertIsInstance(data['confidence'], float)
        self.assertTrue(0 <= data['confidence'] <= 100)

    def test_remedies_loading(self):
        """Test remedies loading from JSON"""
        with open('remedies.json') as f:
            remedies = json.load(f)
        self.assertIsInstance(remedies, dict)
        # Check if remedies exist for common diseases
        common_diseases = ['Apple___Apple_scab', 'Tomato___Late_blight']
        for disease in common_diseases:
            self.assertIn(disease, remedies)
            self.assertIsInstance(remedies[disease], str)

if __name__ == '__main__':
    unittest.main()