# Deployment Guide

## Backend Deployment

### Option 1: Render.com

1. Create account at [render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: agrivision-backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Region**: Choose closest to your users
5. Add environment variables (if needed)
6. Click "Create Web Service"

### Option 2: Railway.app

1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository and `backend` folder
4. Railway auto-detects Python and Flask
5. Click "Deploy"
6. Get your deployment URL from the dashboard

### Option 3: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create agrivision-backend`
4. Deploy:
```bash
cd backend
git push heroku main
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend: `cd frontend`
3. Build: `npm run build`
4. Deploy: `vercel --prod`
5. Follow prompts
6. Set environment variable:
   - Key: `VITE_API_URL`
   - Value: Your backend URL

### Option 2: Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`
4. Set environment variables in Netlify dashboard:
   - `VITE_API_URL`: Your backend URL

### Option 3: GitHub Pages (Static)

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/agrivision/',
  plugins: [react()],
})
```

2. Build: `npm run build`
3. Deploy to gh-pages branch
4. Enable GitHub Pages in repository settings

## Environment Variables

### Backend (.env)
```
FLASK_ENV=production
FLASK_DEBUG=False
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.com
```

## Important Notes

1. **Model File**: Ensure your model file is included in deployment
   - For Render/Railway: Model file will be included automatically
   - For serverless: May need to host model separately

2. **CORS**: Backend already has CORS enabled for all origins
   - In production, restrict to your frontend domain

3. **Database**: SQLite works for demo, but for production consider:
   - PostgreSQL (Render/Railway offer free tier)
   - MongoDB Atlas
   - Firebase

4. **File Upload Size**: Check platform limits
   - Render: 100MB request body
   - Railway: Unlimited on paid plans
   - Vercel: 4.5MB on Hobby plan

## Testing Deployment

1. Test backend: `curl https://your-backend-url.com/health`
2. Test frontend: Open in browser and try uploading an image
3. Check browser console for errors
4. Verify API calls are reaching backend

## Monitoring

- **Backend**: Use platform logs (Render/Railway dashboard)
- **Frontend**: Use Vercel Analytics or Google Analytics
- **Errors**: Consider Sentry for error tracking

## Cost Estimates

### Free Tier Options
- Render: 750 hours/month free
- Railway: $5 credit/month
- Vercel: Unlimited for personal projects
- Netlify: 100GB bandwidth/month

All options above support free deployment for academic/demo projects.
