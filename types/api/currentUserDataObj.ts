import { YeveUser } from "../../store/AuthContext";
import { CategoryDataObj } from "./categoryDataObj";

export type Cancellation = {
  interval: number;
  percentage: number;
};

export type VendorService = {
  category: CategoryDataObj;
  baseRate: number;
  hourlyRate: number;
  rehearsalRate: number;
  cancellation: Cancellation[];
};

export interface currentUserDataObj {
  __v: string;
  _id: string;
  image: string;
  address: string;
  username: string;
  savedLocation: number[];
  city: string;
  country: string;
  createdAt: Date;
  email: string;
  firstName: string;
  isVerified: false;
  lastName: string;
  password: string;
  phone: string;
  plan: "freemium" | "premium" | "elite";
  postalCode: string;
  refreshToken: string;
  state: number;
  twoFactorAuth: boolean;
  updatedAt: Date;
  biography: string;
  userType: YeveUser;
  wallet: Object;
  overallRating: number;
  holidayMood: boolean;
  services: VendorService[];
  followers: string[];
  stripeConnected: boolean;
  stripeId: string;
  following: string[];
  portfolioUrl: string;
}
