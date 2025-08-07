import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Destination } from '../../types';

// Fetch function (GET request)
const fetchDestinations = async (): Promise<Destination[]> => {
  const response = await axios.get('http://127.0.0.1:8000/api/tours/destinations/');
  return response.data;
};

// Hook for fetching destinations
export const useDestinations = () => {
  return useQuery<Destination[]>({
    queryKey: ['destinations'], // Unique key for caching
    queryFn: fetchDestinations,
  });
};