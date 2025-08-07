// store/homeStore.ts
import { create } from 'zustand';
import { Destination } from '../types/homeScreen';

// Define the state interface for the Home store
interface HomeState {
  destinations: Destination[] | null;  // Define destinations as an array of Destination or null
  setHomeData: (data: Destination[]) => void;  // Function to set home data
}

// Create the store using Zustand's `create` function
export const useHomeStore = create<HomeState>((set) => ({
  destinations: null,  // Initial state is null for destinations
  setHomeData: (data: Destination[]) => set({ destinations: data }),  // Update destinations state
}));
