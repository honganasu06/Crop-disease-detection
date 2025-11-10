import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Weather from './Weather';

const Precautions = () => {
  const [precautions, setPrecautions] = useState([]);

  useEffect(() => {
    const defaultPrecautions = [
      {
        id: 1,
        type: 'temperature',
        title: 'Temperature Alert',
        message: 'Moderate temperatures are ideal for most crops. Monitor for heat stress during peak hours.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        severity: 'info',
      },
      {
        id: 2,
        type: 'humidity',
        title: 'Humidity Level',
        message: 'Current humidity levels are suitable. High humidity can promote fungal diseases - ensure proper ventilation.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.798 4.001 4.001 0 00-6.873 4.9z" />
          </svg>
        ),
        severity: 'warning',
      },
      {
        id: 3,
        type: 'general',
        title: 'Crop Protection',
        message: 'Regular monitoring and early detection are key. Check plants daily for signs of disease or pests.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        severity: 'info',
      },
      {
        id: 4,
        type: 'irrigation',
        title: 'Watering Schedule',
        message: 'Maintain consistent watering schedule. Avoid overwatering which can lead to root diseases.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        ),
        severity: 'info',
      },
    ];
    setPrecautions(defaultPrecautions);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'danger':
        return 'border-red-500/50 bg-red-500/10 text-red-400';
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'info':
        return 'border-primary/50 bg-primary/10 text-primary';
      default:
        return 'border-neutral-500/50 bg-neutral-500/10 text-neutral-400';
    }
  };

  return (
    <div className="space-y-6">
      <Weather />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass"
      >
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-base md:text-lg font-bold text-primary">Precautions & Alerts</h3>
        </div>

        <div className="space-y-3">
          {precautions.map((precaution, index) => (
            <motion.div
              key={precaution.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border-l-4 glass-card ${getSeverityColor(precaution.severity)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {precaution.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1 text-sm md:text-base">{precaution.title}</h4>
                  <p className="text-xs md:text-sm leading-relaxed opacity-90">{precaution.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-xl glass-card border border-primary/30">
          <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold text-primary">Tip:</span> Use our AI detection tool regularly to catch diseases early and protect your crops.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Precautions;
