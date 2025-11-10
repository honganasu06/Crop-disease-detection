from flask import Flask, request, jsonify
from flask_cors import CORS
try:
    import tensorflow as tf
    TENSORFLOW_AVAILABLE = True
except ImportError:
    TENSORFLOW_AVAILABLE = False
    print("⚠️  TensorFlow not installed. Running in demo mode.")
    print("    Install TensorFlow to enable AI predictions: pip install tensorflow")
import numpy as np
from PIL import Image
import io
import json
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Load the model
MODEL_PATH = 'model/model.h5'
model = None
model_type = None  # 'keras', 'tflite', or None

# Load remedies
with open('remedies.json', 'r') as f:
    remedies = json.load(f)

# Class names (based on PlantVillage dataset)
CLASS_NAMES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 
    'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy',
    'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
    'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot',
    'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

def init_db():
    """Initialize SQLite database"""
    conn = sqlite3.connect('predictions.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS predictions
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  filename TEXT,
                  timestamp TEXT,
                  prediction TEXT,
                  confidence REAL)''')
    conn.commit()
    conn.close()

def log_prediction(filename, prediction, confidence):
    """Log prediction to database"""
    conn = sqlite3.connect(app.config.get('DATABASE', 'predictions.db'))
    c = conn.cursor()
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute("INSERT INTO predictions (filename, timestamp, prediction, confidence) VALUES (?, ?, ?, ?)",
              (filename, timestamp, prediction, confidence))
    conn.commit()
    conn.close()

def load_model():
    """Load the TensorFlow model"""
    global model, model_type
    if not TENSORFLOW_AVAILABLE:
        print("⚠️  Running in DEMO MODE - predictions will be random")
        print("    To use real AI predictions:")
        print("    1. Install TensorFlow: pip install tensorflow")
        print("    2. Add your trained model.h5 to the model/ directory")
        model = None
        model_type = None
        return
    
    if os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH)
        model_type = 'keras'
        print("Model loaded successfully")
    elif os.path.exists('model/model.tflite'):
        # Load TFLite model
        interpreter = tf.lite.Interpreter(model_path='model/model.tflite')
        interpreter.allocate_tensors()
        model = interpreter
        model_type = 'tflite'
        print("TFLite model loaded successfully")
    else:
        print("Warning: No model file found. Creating a dummy model for testing.")
        # Create a simple dummy model for testing
        model = tf.keras.Sequential([
            tf.keras.layers.InputLayer(input_shape=(224, 224, 3)),
            tf.keras.layers.GlobalAveragePooling2D(),
            tf.keras.layers.Dense(len(CLASS_NAMES), activation='softmax')
        ])
        model_type = 'keras'

def preprocess_image(image):
    """Preprocess the image for model input"""
    # Resize image to model input size
    img = image.resize((224, 224))
    # Convert to array
    img_array = np.array(img)
    # Normalize pixel values
    img_array = img_array / 255.0
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests"""
    try:
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Read and process image
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert RGBA to RGB if necessary
        if image.mode == 'RGBA':
            image = image.convert('RGB')
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Make prediction
        if model is None:
            # Demo mode - generate random prediction
            import random
            predicted_class_idx = random.randint(0, len(CLASS_NAMES) - 1)
            confidence = random.uniform(75.0, 95.0)
        elif model_type == 'tflite':
            # Handle TFLite model
            input_details = model.get_input_details()
            output_details = model.get_output_details()
            
            # Set input tensor
            model.set_tensor(input_details[0]['index'], processed_image.astype(np.float32))
            
            # Run inference
            model.invoke()
            
            # Get output tensor
            predictions = model.get_tensor(output_details[0]['index'])
            predicted_class_idx = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class_idx]) * 100
        else:
            # Handle Keras model
            predictions = model.predict(processed_image, verbose=0)
            predicted_class_idx = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class_idx]) * 100
        
        # Get disease name
        disease_name = CLASS_NAMES[predicted_class_idx]
        # Format disease name for display
        display_name = disease_name.replace('___', ' - ').replace('_', ' ')
        
        # Get remedy
        remedy = remedies.get(disease_name, "Consult an agricultural expert for specific treatment.")
        
        # Log prediction
        log_prediction(file.filename, display_name, confidence)
        
        # Return response
        response = {
            'prediction': display_name,
            'confidence': round(confidence, 2),
            'remedy': remedy
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/insights', methods=['GET'])
def get_insights():
    """Get insights from prediction logs"""
    try:
        conn = sqlite3.connect(app.config.get('DATABASE', 'predictions.db'))
        c = conn.cursor()
        
        # Get most frequent diseases
        c.execute('''SELECT prediction, COUNT(*) as count 
                     FROM predictions 
                     GROUP BY prediction 
                     ORDER BY count DESC 
                     LIMIT 10''')
        frequent_diseases = [{'disease': row[0], 'count': row[1]} for row in c.fetchall()]
        
        # Get average confidence
        c.execute('SELECT AVG(confidence) FROM predictions')
        avg_confidence = c.fetchone()[0] or 0
        
        # Get total predictions
        c.execute('SELECT COUNT(*) FROM predictions')
        total_predictions = c.fetchone()[0]
        
        conn.close()
        
        return jsonify({
            'frequent_diseases': frequent_diseases,
            'average_confidence': round(avg_confidence, 2),
            'total_predictions': total_predictions
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'AgriVision API is running'}), 200

if __name__ == '__main__':
    init_db()
    load_model()
    app.run(debug=True, host='0.0.0.0', port=5000)
