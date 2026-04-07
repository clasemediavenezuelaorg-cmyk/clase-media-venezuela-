export interface UserProfile {
  id: string;
  name: string;
  profession: string;
  skills: string[];
  points: number;
  medals: string[];
  isVerified: boolean;
}

export interface TalentNeed {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  status: "open" | "in-progress" | "resolved";
  createdAt: number;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  authorId: string;
  category: string;
  status: "draft" | "under-review" | "approved";
  votes: number;
  content: string; // Markdown content for the wiki
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  attachmentUrl?: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: "general" | "technical" | "regional";
}

export interface ProjectProgress {
  id: string;
  title: string;
  percentage: number;
  lastUpdate: string;
  description: string;
}

export type ServiceReportStatus = 'pending' | 'in-progress' | 'resolved';

export interface ServiceReport {
  id: string;
  userId: string;
  userName: string;
  type: 'water' | 'electricity' | 'road' | 'security' | 'other';
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: ServiceReportStatus;
  createdAt: number;
  updatedAt: number;
}

export interface Entrepreneur {
  id: string;
  userId: string;
  name: string;
  businessName: string;
  category: 'food' | 'services' | 'products' | 'other';
  description: string;
  contact: string;
  isVerified: boolean;
  photoUrl?: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: number;
  receiptUrl?: string;
}

export interface VolunteerActivity {
  id: string;
  title: string;
  description: string;
  points: number;
  date: number;
  location: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Reward {
  id: string;
  merchantId: string;
  merchantName: string;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  image?: string;
}

export interface UserPoints {
  total: number;
  history: {
    id: string;
    type: 'earn' | 'spend';
    amount: number;
    description: string;
    date: number;
  }[];
}
