import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { predictDisease } from '../services/api';
import jsPDF from 'jspdf';

const Detect = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDetect = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await predictDisease(selectedImage);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadReport = () => {
    if (!result) return;

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('AgriVision - Disease Detection Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.setFontSize(16);
    doc.text('Detected Disease:', 20, 50);
    doc.setFontSize(14);
    doc.text(result.prediction, 20, 60);
    doc.setFontSize(16);
    doc.text('Confidence:', 20, 75);
    doc.setFontSize(14);
    doc.text(`${result.confidence}%`, 20, 85);
    doc.setFontSize(16);
    doc.text('Recommended Treatment:', 20, 100);
    doc.setFontSize(12);
    const splitRemedy = doc.splitTextToSize(result.remedy, 170);
    doc.text(splitRemedy, 20, 110);
    doc.save('agrivision-report.pdf');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="site-h1 mb-4 text-center">
            <span className="text-gradient">Detect Disease</span>
          </h1>
          <p className="lead">
            Upload a plant leaf image to get instant AI-powered disease detection
          </p>

          {/* Upload Section */}
          <div className="card-glass mb-8">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-white/20 rounded-2xl p-8 md:p-12 text-center hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {!preview ? (
                <div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mx-auto h-14 w-14 mb-4 text-primary"
                  >
                    <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" className="w-full h-full">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
                    Drag and drop an image here, or click to select
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Supports: JPG, PNG, JPEG
                  </p>
                </div>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 md:max-h-80 w-auto rounded-xl shadow-lg object-contain"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full glass hover:scale-110 transition-transform"
                  >
                    <svg className="icon text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {preview && (
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  onClick={handleDetect}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                      {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin icon" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Detect Disease
                    </span>
                  )}
                </motion.button>
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  Reset
                </motion.button>
              </div>
            )}
          </div>

          {/* Loading */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="card-glass text-center mb-8"
              >
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
                <p className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold">Analyzing your image...</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">This may take a few seconds</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-glass border-red-500/50 bg-red-500/10 mb-8"
            >
              <div className="flex items-center gap-3">
                <svg className="icon text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="card-glass"
              >
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Detection Results
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2 block">
                      Detected Disease
                    </label>
                    <p className="stat-value text-primary">
                      {result.prediction}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2 block">
                      Confidence Score
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-grow h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full ${
                            result.confidence >= 80
                              ? 'bg-gradient-to-r from-primary to-secondary'
                              : result.confidence >= 60
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                              : 'bg-gradient-to-r from-red-500 to-pink-500'
                          }`}
                        />
                      </div>
                      <span className="text-xl font-bold text-neutral-800 dark:text-white">
                        {result.confidence}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2 block">
                      Recommended Treatment
                    </label>
                    <div className="p-4 rounded-xl glass-card border border-primary/30">
                      <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">{result.remedy}</p>
                    </div>
                  </div>

                  <motion.button
                    onClick={downloadReport}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Report (PDF)
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Detect;
