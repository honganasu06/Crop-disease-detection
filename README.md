# AgriVision – AI Crop Disease Detector 🌱

A complete full-stack web application for detecting crop diseases using AI/ML, featuring a React frontend and Flask backend with TensorFlow model integration.

![AgriVision](https://img.shields.io/badge/AgriVision-AI%20Crop%20Disease%20Detector-green)
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![React](https://img.shields.io/badge/React-18.0+-61DAFB)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-orange)

## 🎯 Features

- **AI-Powered Detection**: Upload plant leaf images and get instant disease predictions
- **High Accuracy**: CNN model trained on PlantVillage dataset (38 disease classes)
- **Confidence Scoring**: Get percentage-based confidence scores for predictions
- **Treatment Recommendations**: Receive specific remedies for each detected disease
- **Liquid Glass Animations**: Beautiful morphing glassmorphism effects throughout the UI
- **Modern UI Design**: Clean, professional interface with Radix UI components
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Processing**: Get results in seconds
- **Dark Mode Support**: Toggle between light and dark themes

## 🚀 Quick Start

### Prerequisites

- Python 3.13 or higher
- Node.js 22 or higher
- npm or yarn

### Quick Start (Windows)

1. **Start Backend**:
   Double-click `start-backend.bat` or run in terminal:
   ```bash
   .\start-backend.bat
   ```

2. **Start Frontend**:
   Double-click `start-frontend.bat` or run in terminal:
   ```bash
   .\start-frontend.bat
   ```

3. **Access App**:
   Open [http://localhost:3000](http://localhost:3000)

### Manual Setup (Cross-Platform)

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Place your trained model:
- Add your `model.h5` or `model.tflite` file to the `model/` directory
- Or download a pre-trained model from Kaggle/HuggingFace

6. Run the backend:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint:
- Create a `.env` file in the frontend directory:
```bash
VITE_API_URL=http://localhost:5000
```
- For production, update `VITE_API_URL` to your deployed backend URL

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` (or the port specified in vite.config.ts)

## 📁 Project Structure

```
agrivision/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── requirements.txt       # Python dependencies
│   ├── remedies.json         # Disease remedies database
│   ├── utils/
│   │   └── preprocess.py     # Image preprocessing utilities
│   └── model/
│       └── model.h5          # Trained TensorFlow model
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.tsx      # Landing page
│   │   │   ├── UploadPage.tsx    # Disease detection upload page
│   │   │   ├── ResultsPage.tsx   # Results display page
│   │   │   ├── WeatherPage.tsx   # Weather information page
│   │   │   ├── Navbar.tsx        # Navigation bar
│   │   │   └── ui/               # Radix UI components
│   │   ├── services/
│   │   │   └── api.ts            # API service layer
│   │   ├── styles/
│   │   │   ├── globals.css       # Global styles
│   │   │   └── liquid-glass.css  # Liquid glass animations
│   │   ├── App.tsx               # Main app component
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Tailwind CSS
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 🔧 Technology Stack

### Backend
- **Framework**: Flask 3.0
- **AI/ML**: TensorFlow 2.15, Keras
- **Image Processing**: Pillow, NumPy
- **Database**: SQLite
- **CORS**: Flask-CORS

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS v4
- **UI Components**: Radix UI
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Custom liquid glass morphing effects
- **Charts**: Recharts
- **HTTP Client**: Native Fetch API

## 🌐 API Endpoints

### POST `/predict`
Upload an image for disease detection.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response:**
```json
{
  "prediction": "Tomato Early Blight",
  "confidence": 93.4,
  "remedy": "Apply fungicides containing chlorothalonil..."
}
```

### GET `/insights`
Get analytics data from prediction history.

**Response:**
```json
{
  "frequent_diseases": [
    {"disease": "Tomato Early Blight", "count": 15}
  ],
  "average_confidence": 87.5,
  "total_predictions": 42
}
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "AgriVision API is running"
}
```

## 📊 Supported Diseases

The model can detect 38 different plant diseases across multiple crops:
- Apple (4 diseases + healthy)
- Cherry (2 diseases + healthy)
- Corn (3 diseases + healthy)
- Grape (3 diseases + healthy)
- Peach (1 disease + healthy)
- Pepper (1 disease + healthy)
- Potato (2 diseases + healthy)
- Tomato (9 diseases + healthy)
- And more...

## 🎨 UI/UX Features

- **Modern Design**: Clean, green-themed interface with glassmorphism
- **Liquid Glass Effects**: Beautiful morphing animations throughout
- **Drag & Drop**: Easy image upload functionality with visual feedback
- **Real-time Feedback**: Loading animations and progress indicators
- **Responsive Layout**: Mobile-first design approach
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Custom CSS animations with morphing effects
- **Interactive Components**: Radix UI powered accessible components

## 🚀 Deployment

### Backend Deployment

**Option 1: Render**
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`
5. Add environment variables if needed

**Option 2: Railway**
1. Connect your repository
2. Railway will auto-detect Flask app
3. Deploy with one click

**Option 3: HuggingFace Spaces**
1. Create a new Space
2. Upload your backend code
3. Configure as a Flask app

### Frontend Deployment

**Option 1: Vercel**
```bash
npm run build
vercel --prod
```

**Option 2: Netlify**
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables

Frontend (`.env`):
```
VITE_API_URL=https://your-backend-url.com
```

##  Team

- **shabrish** - Data Collection & Preparation
- **harsha vardhan** - AI Model Development
- **nandan** - Backend & Deployment
- **sreenitha** - Frontend Development

**Institution**: Msrit  
**Guide**: meera maam  
**Project Year**: 2025-2026

##  License

This project is developed as an academic capstone project.

##  Contributing

Contributions, issues, and feature requests are welcome!

##  Contact

- Email: honganasu06@gmail.com
- Project Link: [https://github.com/honganasu06/Crop-disease-detection](https://github.com/honganasu06/Crop-disease-detection)

##  Acknowledgments

- PlantVillage dataset for training data
- TensorFlow and Keras teams
- React and Vite communities
- All open-source contributors

---

**Made with ❤️ for sustainable agriculture**
