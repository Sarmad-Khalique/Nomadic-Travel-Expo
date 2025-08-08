import { z } from 'zod';

// Menu item schema
export const menuItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  isActive: z.boolean().default(false),
  isExpanded: z.boolean().default(false),
  subItems: z.array(z.object({
    id: z.string(),
    title: z.string(),
    isActive: z.boolean().default(false),
  })).optional(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

// User profile schema
export const userProfileSchema = z.object({
  name: z.string(),
  location: z.string(),
  profileImage: z.string(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// Sidebar props schema
export const sidebarPropsSchema = z.object({
  isVisible: z.boolean(),
  onClose: z.function(),
});

export type SidebarProps = {
  isVisible: boolean;
  onClose: () => void;
};
