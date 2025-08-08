// store/homeStore.ts
import { create } from 'zustand';
import { City, Destination } from '../types/homeScreen';

// Define the state interface for the Home store
interface HomeState {
  destinations: Destination[] | null;
  selectedDestination: Destination | null;
  cities: City[];
  setHomeData: (data: Destination[]) => void;
  setSelectedDestination: (destination: Destination | null) => void;
  setCities: (cities: City[]) => void;
}

// Create the store using Zustand's `create` function
export const useHomeStore = create<HomeState>((set) => ({
  destinations: null,
  selectedDestination: null,
  cities: [
    { name: "Lahore", latitude: 31.5497, longitude: 74.3436 },
    { name: "Karachi", latitude: 24.8607, longitude: 67.0011 },
    { name: "Islamabad", latitude: 33.6844, longitude: 73.0479 },
    { name: "Peshawar", latitude: 34.0150, longitude: 71.5249 },
    { name: "Quetta", latitude: 30.1798, longitude: 66.9749 },
    { name: "Multan", latitude: 30.1575, longitude: 71.5249 },
    { name: "Faisalabad", latitude: 31.4504, longitude: 73.1350 },
    { name: "Rawalpindi", latitude: 33.5651, longitude: 73.0169 },
  ],
  setHomeData: (data: Destination[]) => set({ destinations: data }),
  setSelectedDestination: (destination: Destination | null) => set({ selectedDestination: destination }),
  setCities: (cities: City[]) => set({ cities }),
}));
