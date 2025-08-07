// types/homeScreen.ts
import { z } from 'zod';

// Facility and Category schema
const facilitySchema = z.object({
  id: z.number(),
  name: z.string(),
});

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

const imageSchema = z.object({
  id: z.number(),
  image: z.string(),
});

// Destination schema
export const destinationSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  location_url: z.string().url(),
  description: z.string(),
  price: z.string(),
  rating: z.string(),
  facilities: z.array(facilitySchema),
  categories: z.array(categorySchema),
  images: z.array(imageSchema),
});

export type Destination = z.infer<typeof destinationSchema>;

// Response schema for the list of destinations
export const destinationsResponseSchema = z.array(destinationSchema);
