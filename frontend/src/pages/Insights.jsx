import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getInsights } from '../services/api';

const COLORS = ['#5B9BD5', '#7FB3B8', '#B8A9D9', '#8DBDE1', '#A38FC3', '#67A7D7'];

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card-glass border-red-500/50 bg-red-500/10 max-w-md text-center">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Insights</h3>
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button onClick={fetchInsights} className="btn-secondary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="site-h1 mb-4 text-center">
            <span className="text-gradient">Detection Insights</span>
          </h1>
          <p className="lead">
            Analytics and trends from disease detection data
          </p>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
              { label: 'Total Predictions', value: insights?.total_predictions || 0, colorClass: 'text-primary', icon: (
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ) },
              { label: 'Average Confidence', value: `${insights?.average_confidence?.toFixed(1) || 0}%`, colorClass: 'text-secondary', icon: (
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) },
              { label: 'Unique Diseases', value: insights?.frequent_diseases?.length || 0, colorClass: 'text-accent', icon: (
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M6.343 6.343l-.707.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card-glass"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                      {stat.label}
                    </p>
                    <p className={`stat-value ${stat.colorClass}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={stat.colorClass}>
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          {insights?.frequent_diseases && insights.frequent_diseases.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card-glass"
              >
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-6">
                  Most Frequent Diseases
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={insights.frequent_diseases.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="disease" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                    <YAxis tick={{ fill: '#9CA3AF' }} />
                    <Tooltip wrapperClassName="chart-tooltip" />
                    <Legend />
                    <Bar dataKey="count" fill="#5B9BD5" radius={[8, 8, 0, 0]} name="Detection Count" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="card-glass"
              >
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-6">
                  Disease Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={insights.frequent_diseases.slice(0, 6)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {insights.frequent_diseases.slice(0, 6).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip wrapperClassName="chart-tooltip" />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          ) : (
            <div className="card-glass text-center py-12">
              <svg className="icon icon-lg text-neutral-400 dark:text-neutral-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">No Data Available</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Start detecting diseases to see insights here</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Insights;
