import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, AlertTriangle } from 'lucide-react';

export function WeatherPage() {
  const [weatherData, setWeatherData] = useState({
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 68,
    windSpeed: 12,
    visibility: 8,
    pressure: 1013,
    feelsLike: 26,
    precipitation: 20,
  });

  // Simulate weather updates
  useEffect(() => {
  const fetchWeather = async () => {
    const apiKey = "c53ed974160748c9978143028251611";
    const city = "Bangalore";
  
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    setWeatherData({
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      visibility: data.visibility / 1000,
      pressure: data.main.pressure,
      condition: data.weather[0].description,
      precipitation: data.rain?.["1h"] || 0,
    });
  };

  fetchWeather();
  const interval = setInterval(fetchWeather, 60000); // refresh every  mins

  return () => clearInterval(interval);
}, []);

  const getPrecautions = () => {
    const precautions = [];

    if (weatherData.temperature > 30) {
      precautions.push({
        title: 'High Temperature Alert',
        description: 'Increase irrigation frequency. Consider shade nets for sensitive crops. Monitor plants for heat stress.',
        severity: 'high',
        icon: Sun,
      });
    }

    if (weatherData.temperature < 10) {
      precautions.push({
        title: 'Low Temperature Warning',
        description: 'Protect crops from frost. Use row covers or mulch. Delay planting of warm-season crops.',
        severity: 'high',
        icon: AlertTriangle,
      });
    }

    if (weatherData.humidity > 80) {
      precautions.push({
        title: 'High Humidity Alert',
        description: 'Increased risk of fungal diseases. Improve air circulation. Apply preventive fungicides if necessary.',
        severity: 'medium',
        icon: Droplets,
      });
    }

    if (weatherData.humidity < 40) {
      precautions.push({
        title: 'Low Humidity Notice',
        description: 'Plants may experience moisture stress. Increase watering frequency. Consider misting for sensitive plants.',
        severity: 'medium',
        icon: Droplets,
      });
    }

    if (weatherData.windSpeed > 20) {
      precautions.push({
        title: 'Strong Wind Warning',
        description: 'Secure tall plants and structures. Risk of physical damage to crops. Delay spraying operations.',
        severity: 'high',
        icon: Wind,
      });
    }

    if (weatherData.precipitation > 30) {
      precautions.push({
        title: 'Heavy Rain Expected',
        description: 'Ensure proper drainage. Risk of waterlogging. Delay field operations. Monitor for disease outbreaks.',
        severity: 'high',
        icon: CloudRain,
      });
    }

    // Default good conditions
    if (precautions.length === 0) {
      precautions.push({
        title: 'Optimal Growing Conditions',
        description: 'Weather conditions are favorable for plant growth. Good time for planting, fertilizing, and general maintenance.',
        severity: 'low',
        icon: Sun,
      });
    }

    return precautions;
  };

  const precautions = getPrecautions();

  const weatherMetrics = [
    { label: 'Temperature', value: `${weatherData.temperature}°C`, icon: Sun, color: 'text-chart-4' },
    { label: 'Feels Like', value: `${weatherData.feelsLike}°C`, icon: Sun, color: 'text-chart-5' },
    { label: 'Humidity', value: `${Math.round(weatherData.humidity)}%`, icon: Droplets, color: 'text-chart-2' },
    { label: 'Wind Speed', value: `${weatherData.windSpeed} km/h`, icon: Wind, color: 'text-primary' },
    { label: 'Visibility', value: `${weatherData.visibility} km`, icon: Eye, color: 'text-chart-3' },
    { label: 'Pressure', value: `${weatherData.pressure} mb`, icon: Gauge, color: 'text-chart-1' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Cloud className="w-4 h-4 text-primary" />
            <span className="text-primary">Real-Time Weather Monitoring</span>
          </div>
          <h1 className="text-foreground">Weather Dashboard</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Stay informed with current weather conditions and receive tailored agricultural precautions to protect your crops.
          </p>
        </div>

        {/* Current Weather */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/20 to-primary/5 rounded-3xl p-12 border border-primary/20 shadow-lg">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-card/50 backdrop-blur-sm">
              <Cloud className="w-12 h-12 text-primary" />
            </div>
            <div>
              <div className="text-foreground mb-2">{weatherData.temperature}°C</div>
              <p className="text-muted-foreground">{weatherData.condition}</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border">
              <CloudRain className="w-4 h-4 text-chart-2" />
              <span className="text-muted-foreground">{weatherData.precipitation}% chance of rain</span>
            </div>
          </div>
        </div>

        {/* Weather Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border shadow-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${metric.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-foreground">{metric.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agricultural Precautions */}
        <div className="space-y-6">
          <div>
            <h2 className="text-foreground mb-2">Agricultural Precautions</h2>
            <p className="text-muted-foreground">
              Based on current weather conditions, here are recommended actions for your crops
            </p>
          </div>

          <div className="grid gap-6">
            {precautions.map((precaution, index) => {
              const Icon = precaution.icon;
              return (
                <div
                  key={index}
                  className={`bg-card rounded-2xl p-8 border transition-all shadow-lg ${
                    precaution.severity === 'high'
                      ? 'border-destructive/30 bg-destructive/5'
                      : precaution.severity === 'medium'
                      ? 'border-chart-4/30 bg-chart-4/5'
                      : 'border-primary/30 bg-primary/5'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        precaution.severity === 'high'
                          ? 'bg-destructive/20 text-destructive'
                          : precaution.severity === 'medium'
                          ? 'bg-chart-4/20 text-chart-4'
                          : 'bg-primary/20 text-primary'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-foreground">{precaution.title}</h3>
                        {precaution.severity === 'high' && (
                          <div className="px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 flex-shrink-0">
                            <span className="text-destructive">High Priority</span>
                          </div>
                        )}
                        {precaution.severity === 'medium' && (
                          <div className="px-3 py-1 rounded-full bg-chart-4/10 border border-chart-4/20 flex-shrink-0">
                            <span className="text-chart-4">Medium Priority</span>
                          </div>
                        )}
                      </div>
                      <p className="text-muted-foreground">{precaution.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weather Tips */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg space-y-4">
          <h3 className="text-foreground">General Weather Monitoring Tips</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <p className="text-muted-foreground">
                Check weather forecasts daily to plan agricultural activities in advance
              </p>
            </div>
            <div className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <p className="text-muted-foreground">
                Monitor humidity levels to prevent fungal disease outbreaks
              </p>
            </div>
            <div className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <p className="text-muted-foreground">
                Track temperature patterns for optimal planting and harvesting times
              </p>
            </div>
            <div className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
              <p className="text-muted-foreground">
                Stay prepared for sudden weather changes with protective measures
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
