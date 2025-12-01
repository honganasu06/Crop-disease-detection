import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, CheckCircle, Droplets, Sun, Sprout, Upload, Shield, Stethoscope, Leaf, Pill } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface RemedyData {
  description: string;
  causes: string[];
  cure: string[];
  prevention: string[];
  medicine: string[];
}

interface PredictionData {
  prediction: string;
  confidence: number;
  remedy: RemedyData;
  imageUrl?: string;
  fileName?: string;
}

export function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState<PredictionData | null>(null);
  const pageReveal = useScrollReveal();
  const cardReveal = useScrollReveal();

  useEffect(() => {
    // Check if we have data in location state (from upload page)
    if (location.state?.result) {
      const { result: apiResult, image } = location.state;
      const formattedResult: PredictionData = {
        ...apiResult,
        imageUrl: image
      };
      setResult(formattedResult);
      // Save to sessionStorage for persistence on refresh
      sessionStorage.setItem('predictionResult', JSON.stringify(formattedResult));

      // Clear location state to avoid stale data if we navigate back
      window.history.replaceState({}, document.title);
    } else {
      // Fallback to sessionStorage
      const storedResult = sessionStorage.getItem('predictionResult');
      if (storedResult) {
        try {
          const parsedResult = JSON.parse(storedResult);
          setResult(parsedResult);
        } catch (error) {
          console.error('Failed to parse prediction result:', error);
          navigate('/upload');
        }
      } else {
        // No result found, redirect to upload page
        navigate('/upload');
      }
    }
  }, [navigate, location.state]);

  if (!result) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  // Determine severity based on confidence
  const getSeverity = (confidence: number): string => {
    if (confidence >= 80) return 'High';
    if (confidence >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <div className="min-h-screen py-12 animated-bg">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-8" ref={pageReveal.elementRef}>
        {/* Header */}
        <div className={`text-center space-y-4 ${pageReveal.isRevealed ? 'animate-fade-in-down' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-bounce-in animate-pulse-glow">
            <CheckCircle className="w-4 h-4 text-primary icon-bounce" />
            <span className="text-primary gradient-text font-medium">Analysis Complete</span>
          </div>
          <h1 className="text-foreground text-4xl md:text-5xl font-bold shimmer-text">Disease Identification Results</h1>
        </div>

        {/* Main Result Card */}
        <div className={`bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] liquid-glass-card liquid-glass-morph ${pageReveal.isRevealed ? 'animate-scale-in' : 'opacity-0'}`} ref={cardReveal.elementRef}>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="rounded-2xl overflow-hidden bg-black/20 border border-white/10 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              {result.imageUrl ? (
                <img
                  src={result.imageUrl}
                  alt="Analyzed leaf"
                  className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1650731900879-b5f25088ff31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxlYXZlcyUyMG5hdHVyZXxlbnwxfHx8fDE3NjMyMTAxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Analyzed leaf"
                  className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-700"
                />
              )}
            </div>

            <div className="space-y-8 flex flex-col justify-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-4">
                  <Leaf className="w-4 h-4" />
                  <span>AI Diagnosis</span>
                </div>
                <h2 className="text-foreground mb-4 text-4xl md:text-5xl font-bold tracking-tight">{result.prediction}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed border-l-2 border-primary/30 pl-4">
                  {result.remedy.description}
                </p>
              </div>

              <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Confidence Level</span>
                    <span className="text-primary font-bold text-xl">{result.confidence}%</span>
                  </div>
                  <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full relative overflow-hidden"
                      style={{ width: `${result.confidence}%` }}
                    >
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
                      <div className="absolute top-0 right-0 h-full w-2 bg-white/50 blur-[2px]"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-xl p-4 space-y-1 border border-white/5">
                    <p className="text-muted-foreground text-sm uppercase tracking-wider">Severity</p>
                    <p className={`text-xl font-bold ${getSeverity(result.confidence) === 'High' ? 'text-destructive' : 'text-foreground'}`}>
                      {getSeverity(result.confidence)}
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 space-y-1 border border-white/5">
                    <p className="text-muted-foreground text-sm uppercase tracking-wider">Status</p>
                    <p className={`text-xl font-bold ${result.confidence >= 70 ? 'text-yellow-400' : 'text-blue-400'}`}>
                      {result.confidence >= 70 ? 'Action Required' : 'Monitor Closely'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Detailed Information Grid */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Causes */}
            <div className="bg-card/50 backdrop-blur-lg rounded-3xl p-8 border border-white/5 shadow-lg hover:border-orange-500/30 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-orange-500/20">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Causes</h3>
              </div>
              <ul className="space-y-4">
                {result.remedy.causes.map((cause, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5 flex-shrink-0 shadow-[0_0_10px_orange]"></span>
                    <span className="leading-relaxed">{cause}</span>
                  </li>
                ))}
                {result.remedy.causes.length === 0 && <li className="text-muted-foreground italic">No specific causes listed.</li>}
              </ul>
            </div>

            {/* Prevention */}
            <div className="bg-card/50 backdrop-blur-lg rounded-3xl p-8 border border-white/5 shadow-lg hover:border-green-500/30 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Prevention</h3>
              </div>
              <ul className="space-y-4">
                {result.remedy.prevention.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 flex-shrink-0 shadow-[0_0_10px_green]"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
                {result.remedy.prevention.length === 0 && <li className="text-muted-foreground italic">No specific prevention methods listed.</li>}
              </ul>
            </div>

            {/* Cures */}
            <div className="bg-card/50 backdrop-blur-lg rounded-3xl p-8 border border-white/5 shadow-lg hover:border-blue-500/30 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                  <Stethoscope className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Cure & Management</h3>
              </div>
              <ul className="space-y-4">
                {result.remedy.cure.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0 shadow-[0_0_10px_blue]"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
                {result.remedy.cure.length === 0 && <li className="text-muted-foreground italic">No specific cures listed.</li>}
              </ul>
            </div>

            {/* Medicine */}
            <div className="bg-card/50 backdrop-blur-lg rounded-3xl p-8 border border-white/5 shadow-lg hover:border-purple-500/30 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                  <Pill className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Recommended Medicine</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {result.remedy.medicine.map((med, index) => (
                  <span key={index} className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold hover:bg-purple-500/20 transition-colors cursor-default">
                    {med}
                  </span>
                ))}
                {result.remedy.medicine.length === 0 && <span className="text-muted-foreground italic">No specific medicines listed.</span>}
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors liquid-glass-button btn-interactive glow-on-hover"
            >
              <Upload className="w-5 h-5 icon-bounce" />
              Analyze Another Image
            </Link>
            <Link
              to="/weather"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card text-foreground border border-border hover:bg-accent transition-colors liquid-glass-card liquid-glass-hover btn-interactive"
            >
              Check Weather
            </Link>
          </div>

          {/* Warning Notice */}
          <div className="bg-accent/50 rounded-xl p-6 flex gap-4 liquid-glass liquid-glass-pulse">
            <AlertCircle className="w-6 h-6 text-chart-4 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-foreground">Important Notice</p>
              <p className="text-muted-foreground">
                This analysis is based on AI image recognition and should be used as a guide. For critical
                decisions, please consult with a local agricultural expert or plant pathologist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
