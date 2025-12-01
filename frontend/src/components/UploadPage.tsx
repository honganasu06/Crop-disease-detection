import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, AlertCircle, FileImage, Scan, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { predictDisease } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const reveal = useScrollReveal();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size too large. Please upload an image smaller than 5MB.');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const result = await predictDisease(file);
      navigate('/results', { state: { result, image: preview } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto" ref={reveal.elementRef}>
        <div className={`space-y-8 ${reveal.isRevealed ? 'animate-fade-in-up' : 'opacity-0'}`}>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm tracking-wider uppercase animate-pulse">
              <Scan className="w-4 h-4" />
              <span>Analysis Protocol Initiated</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Upload </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ccff00] to-primary glitch-effect" data-text="Specimen">Specimen</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Upload a clear leaf image for instant neural network analysis.
            </p>
          </div>

          <div className="relative group">
            {/* Portal Effect Background */}
            <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-green-400/20 to-primary/20 rounded-3xl blur-xl transition-all duration-500 ${isDragActive ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-50'}`}></div>

            <div
              {...getRootProps()}
              className={`relative bg-card/50 backdrop-blur-xl rounded-3xl border-2 border-dashed transition-all duration-300 min-h-[400px] flex flex-col items-center justify-center cursor-pointer overflow-hidden ${isDragActive
                ? 'border-primary bg-primary/5 shadow-[0_0_50px_rgba(74,222,128,0.2)] scale-[1.02]'
                : error
                  ? 'border-destructive/50 hover:border-destructive'
                  : 'border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]'
                }`}
            >
              <input {...getInputProps()} />

              {/* Scanning Laser Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(74,222,128,0.8)] animate-scan"></div>
              </div>

              {preview ? (
                <div className="relative w-full h-full min-h-[400px] p-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                    <p className="text-white font-mono bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">Click or drop to replace specimen</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-destructive text-white rounded-full backdrop-blur-md transition-colors border border-white/10"
                    aria-label="Remove image"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="text-center p-12 space-y-6 relative z-10">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-green-400/20 flex items-center justify-center mx-auto border border-white/10 transition-transform duration-500 ${isDragActive ? 'scale-125 rotate-180' : 'group-hover:scale-110'}`}>
                    <Upload className={`w-10 h-10 text-primary transition-all duration-500 ${isDragActive ? 'scale-125' : ''}`} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-white">
                      {isDragActive ? 'Drop specimen here' : 'Initialize Upload'}
                    </p>
                    <p className="text-muted-foreground">
                      Drag & drop or click to browse filesystem
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <FileImage className="w-3 h-3" /> JPG, PNG
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <AlertCircle className="w-3 h-3" /> Max 5MB
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-xl flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {file && !loading && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleAnalyze}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-black font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] overflow-hidden w-full md:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                <Scan className="w-5 h-5" />
                <span>Run Analysis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center space-y-6 pt-8">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <div className="absolute inset-4 rounded-full border-4 border-green-400/20"></div>
                <div className="absolute inset-4 rounded-full border-4 border-green-400 border-b-transparent animate-spin-reverse"></div>
                <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white animate-pulse">Processing Specimen...</h3>
                <p className="text-muted-foreground font-mono">Running neural network inference</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
