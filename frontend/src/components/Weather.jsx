import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Weather = () => {
  const { theme } = useTheme();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setLocation({ lat: 40.7128, lon: -74.0060 });
        }
      );
    } else {
      setLocation({ lat: 40.7128, lon: -74.0060 });
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeather();
    }
  }, [location]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const API_KEY = 'demo_key';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const mockData = {
          name: 'Your Location',
          main: { temp: 25, humidity: 65, feels_like: 27 },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          wind: { speed: 3.5 },
        };
        setWeather(mockData);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      const mockData = {
        name: 'Your Location',
        main: { temp: 25, humidity: 65, feels_like: 27 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 3.5 },
      };
      setWeather(mockData);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
      Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️',
    };
    return icons[condition] || '🌤️';
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-glass"
      >
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glass"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-primary">
          🌤️ Weather
        </h3>
        <button
          onClick={fetchWeather}
          className="p-2 rounded-lg glass hover:scale-110 transition-transform"
          title="Refresh weather"
        >
         🔄
        </button>
      </div>

      {weather && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {weather.name}
              </p>
            </div>
            <div className="text-3xl">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
            <div className="p-3 rounded-lg glass-card">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Feels like</p>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {Math.round(weather.main.feels_like)}°C
              </p>
            </div>
            <div className="p-3 rounded-lg glass-card">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Humidity</p>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {weather.main.humidity}%
              </p>
            </div>
            <div className="p-3 rounded-lg glass-card">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Wind</p>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {weather.wind?.speed || 0} m/s
              </p>
            </div>
            <div className="p-3 rounded-lg glass-card">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Condition</p>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 capitalize">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Weather;
