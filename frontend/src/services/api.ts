const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  remedy: string;
}

export interface InsightsResponse {
  frequent_diseases: Array<{ disease: string; count: number }>;
  average_confidence: number;
  total_predictions: number;
}

export interface HealthResponse {
  status: string;
  message: string;
}

/**
 * Predict disease from uploaded image
 */
export const predictDisease = async (imageFile: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: PredictionResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to predict disease: ${error.message}`);
    }
    throw new Error('Failed to predict disease: Unknown error');
  }
};

/**
 * Get insights from prediction history
 */
export const getInsights = async (): Promise<InsightsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/insights`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: InsightsResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch insights: ${error.message}`);
    }
    throw new Error('Failed to fetch insights: Unknown error');
  }
};

/**
 * Health check endpoint
 */
export const healthCheck = async (): Promise<HealthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HealthResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API is not available: ${error.message}`);
    }
    throw new Error('API is not available: Unknown error');
  }
};

export default {
  predictDisease,
  getInsights,
  healthCheck,
};

