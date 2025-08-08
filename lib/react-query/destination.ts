import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Destination, destinationsResponseSchema } from '../../types/homeScreen';

// API configuration
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Fetch function (GET request) with proper error handling
const fetchDestinations = async (): Promise<Destination[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tours/destinations/`);

    // Validate response data with Zod
    const validatedData = destinationsResponseSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch destinations: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('Failed to fetch destinations');
  }
};

// Hook for fetching destinations with proper configuration
export const useDestinations = () => {
  return useQuery<Destination[], Error>({
    queryKey: ['destinations'],
    queryFn: fetchDestinations,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};