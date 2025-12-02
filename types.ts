export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  location: string;
  note?: string;
  category: 'food' | 'sightseeing' | 'shopping' | 'travel' | 'other';
}

export interface DayPlan {
  date: string;
  dayLabel: string; // e.g., "Day 1"
  items: ItineraryItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'essential' | 'clothing' | 'electronics' | 'toiletries';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export enum AppView {
  DASHBOARD = 'dashboard',
  ITINERARY = 'itinerary',
  CHECKLIST = 'checklist',
  TOOLS = 'tools',
  AI_ASSISTANT = 'ai_assistant'
}