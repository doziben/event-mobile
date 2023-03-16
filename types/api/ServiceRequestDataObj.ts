import { DressCodeDto } from "../../hooks/queries/misc/useDressCodes";
import { CategoryDto } from "./categoryDataObj";
import { RequestApplicationDto } from "./requestApplicationDto";

export type serviceStatus = "pending" | "active" | "completed";
export interface ServiceRequestDataObj {
  _id?: string;
  createdAt?: number;
  numberOfApplicant?: number;
  userId: string;
  address: string;
  address2: string;
  postalCode: string;
  date: number;
  hours: number;
  info: string;
  rehearsal: boolean;
  sameVenue: boolean;
  venueAddress: string;
  eventType: string;
  recurring: boolean;
  recurringInterval: string;
  recurringDay: number;
  recurringDayMonth: number;
  dressCode: string;
  budget: {
    type: "fixed" | "range";
    fixedPrice: number;
    range: { min: number; max: number };
  };
  numberOfResponse: number;
  experienceLevel: string;
  placeId: string;
  status: serviceStatus;
  category: string;
  title: string;
  applications?: RequestApplicationDto[];
  country: number;
  state: number;
  otherDetails: Object;
}

export interface ServiceRequestData {
  _id?: string;
  createdAt?: number;
  numberOfApplicant?: number;
  userId: string;
  address: string;
  address2: string;
  postalCode: string;
  date: number;
  hours: number;
  info: string;
  rehearsal: boolean;
  sameVenue: boolean;
  venueAddress: string;
  eventType: DressCodeDto;
  recurring: boolean;
  recurringInterval: string;
  recurringDay: number;
  recurringDayMonth: number;
  dressCode: DressCodeDto;
  budget: {
    type: "fixed" | "range";
    fixedPrice: number;
    range: { min: number; max: number };
  };
  numberOfResponse: number;
  experienceLevel: string;
  placeId: string;
  status: serviceStatus;
  category: string;
  title: string;
  applications?: RequestApplicationDto[];
  country: number;
  state: number;
  otherDetails: Object;
}
