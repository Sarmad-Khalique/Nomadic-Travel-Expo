import { create } from 'zustand';
import { MenuItem, UserProfile } from '../types/sidebar';

interface SidebarState {
  isVisible: boolean;
  userProfile: UserProfile;
  menuItems: MenuItem[];
  setSidebarVisibility: (isVisible: boolean) => void;
  toggleMenuItem: (itemId: string) => void;
  setActiveMenuItem: (itemId: string) => void;
  setUserProfile: (profile: UserProfile) => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isVisible: false,
  userProfile: {
    name: "Hemendra",
    location: "Pakistan",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  menuItems: [
    {
      id: "home",
      title: "Home",
      icon: "home-icon.png",
      isActive: false,
      isExpanded: false,
    },
    {
      id: "holiday-types",
      title: "Holiday Types",
      icon: "flight.png",
      isActive: true,
      isExpanded: true,
      subItems: [
        { id: "all-holidays", title: "All Holidays", isActive: false },
        { id: "camping", title: "Camping", isActive: false },
        { id: "family-holidays", title: "Family Holidays", isActive: true },
        { id: "luxury-tour", title: "Luxury Tour", isActive: false },
      ],
    },
    {
      id: "trecking",
      title: "Trecking",
      icon: "Walking.png",
      isActive: false,
      isExpanded: false,
    },
    {
      id: "climbing",
      title: "Climbing",
      icon: "Mountain.png",
      isActive: false,
      isExpanded: false,
    },
    {
      id: "special-interest",
      title: "Special Interest",
      icon: "Heart.png",
      isActive: false,
      isExpanded: false,
    },
    {
      id: "news",
      title: "News",
      icon: "Chat Settings.png",
      isActive: false,
      isExpanded: false,
    },
    {
      id: "contact",
      title: "Contact",
      icon: "Chat Settings.png",
      isActive: false,
      isExpanded: false,
    },
    {
      id: "about",
      title: "About",
      icon: "About.png",
      isActive: false,
      isExpanded: false,
    },
    {
      id: "settings",
      title: "Settings",
      icon: "Chat Settings.png",
      isActive: false,
      isExpanded: false,
    },
    {
      id: "logout",
      title: "Logout",
      icon: "logout.png",
      isActive: false,
      isExpanded: false,
    },
  ],
  setSidebarVisibility: (isVisible: boolean) => set({ isVisible }),
  toggleMenuItem: (itemId: string) => {
    const { menuItems } = get();
    const updatedItems = menuItems.map(item => {
      if (item.id === itemId) {
        return { ...item, isExpanded: !item.isExpanded };
      }
      return item;
    });
    set({ menuItems: updatedItems });
  },
  setActiveMenuItem: (itemId: string) => {
    const { menuItems } = get();
    const updatedItems = menuItems.map(item => ({
      ...item,
      isActive: item.id === itemId,
      // Keep expansion state for the clicked item, collapse others
      isExpanded: item.id === itemId ? item.isExpanded : false,
      subItems: item.subItems?.map(subItem => ({
        ...subItem,
        isActive: subItem.id === itemId,
      })),
    }));
    set({ menuItems: updatedItems });
  },
  setUserProfile: (profile: UserProfile) => set({ userProfile: profile }),
}));
