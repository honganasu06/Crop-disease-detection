# Quick Start Guide - AgriVision

## 🚀 Running the Application

### Prerequisites
- Python 3.10+ installed
- Node.js 18+ installed
- npm installed

### Option 1: Using Batch Files (Windows)

#### Start Backend
Double-click `start-backend.bat` or run in terminal:
```bash
start-backend.bat
```

#### Start Frontend
Double-click `start-frontend.bat` or run in terminal:
```bash
start-frontend.bat
```

### Option 2: Manual Setup

#### Backend Setup
1. Open terminal and navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install Flask flask-cors Pillow numpy
```

3. (Optional) Install TensorFlow for AI predictions:
```bash
pip install tensorflow
```

4. Run the server:
```bash
python app.py
```
Backend will run at: http://localhost:5000

#### Frontend Setup
1. Open a new terminal and navigate to frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
Frontend will run at: http://localhost:5173

## 📝 Important Notes

### Demo Mode
The application runs in **DEMO MODE** by default (without TensorFlow). In this mode:
- ✅ You can upload images and test the UI
- ✅ You will get random predictions (for testing)
- ❌ AI predictions are NOT real

### Enable Real AI Predictions
To enable actual AI disease detection:

1. Install TensorFlow:
```bash
cd backend
pip install tensorflow
```

2. Add your trained model:
   - Place `model.h5` or `model.tflite` in `backend/model/` directory
   - You can train your own model using `backend/train_model.py`
   - Or download a pre-trained model from Kaggle/HuggingFace

3. Restart the backend server

### Where to Get Models
- **Kaggle**: Search for "PlantVillage Disease Classification"
- **HuggingFace**: Check the model hub for crop disease models
- **Train Your Own**: Use the template in `backend/train_model.py`

## 🧪 Testing the Application

1. **Backend Health Check**:
   Open browser: http://localhost:5000/health
   Should return: `{"status": "healthy", "message": "AgriVision API is running"}`

2. **Frontend**:
   Open browser: http://localhost:5173
   - Navigate through different pages
   - Test the Detect page by uploading a plant image

3. **Test Detection** (Demo Mode):
   - Go to Detect page
   - Upload any plant/leaf image
   - Click "Detect Disease"
   - You'll get a random prediction (since TensorFlow is not installed)

## 🎨 Features to Test

- **Home Page**: Landing page with project overview
- **Detect Page**: 
  - Drag & drop image upload
  - Image preview
  - Disease detection
  - Confidence score display
  - Treatment recommendations
  - Download PDF report

- **Insights Page**: 
  - Analytics dashboard
  - Bar charts showing disease frequency
  - Pie charts for distribution
  - Statistics cards

- **About Page**: 
  - Team information
  - Technology stack
  - Project details

- **Contact Page**: 
  - Contact form
  - Contact information

## 🔧 Troubleshooting

### Backend won't start
- Make sure Python is installed: `python --version`
- Check if port 5000 is available
- Install missing dependencies: `pip install -r requirements.txt`

### Frontend won't start
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` and reinstall: `npm install`
- Check if port 5173 is available

### Cannot upload images
- Check if backend is running (visit http://localhost:5000/health)
- Check browser console for CORS errors
- Verify frontend .env has correct API URL

### Predictions not working
- This is normal in DEMO MODE
- Install TensorFlow and add a model file for real predictions
- Check backend terminal for error messages

## 📱 Mobile Testing

The app is fully responsive. To test on mobile:
1. Find your computer's IP address
2. On the same WiFi network, visit:
   - Frontend: http://YOUR_IP:5173
   - Backend: http://YOUR_IP:5000

## 🎓 For Academic Demo

If you're presenting this project:
1. Start both backend and frontend
2. Keep terminal windows visible (shows it's running)
3. Use the frontend interface to demonstrate
4. Show the insights page with analytics
5. Download a PDF report to show the feature

## 📞 Support

If you encounter issues:
1. Check the README.md for detailed documentation
2. Review the DEPLOYMENT.md for production setup
3. Check terminal logs for error messages
4. Ensure all dependencies are installed

## ✅ Success Checklist

- [ ] Backend running at http://localhost:5000
- [ ] Frontend running at http://localhost:5173
- [ ] Can access home page
- [ ] Can upload an image on Detect page
- [ ] Prediction returns results (even if random in demo mode)
- [ ] Can view Insights page
- [ ] Can download PDF report
- [ ] All pages are responsive

---

**Happy Testing! 🌱**
