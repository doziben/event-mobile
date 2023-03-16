export type RequestApplicationDto = {
  userId: {
    id: string;
    image: string;
    firstName: string;
    lastName: string;
  };
  serviceRequest: string;
  date: Date;
  rate: number;
  recurring: boolean;
  email: string;
  customizeRate: boolean;
  _id: string;
  createdAt: number;
  updatedAt: number;
  status: "pending" | "accepted" | "rejected";
  description?: string;
};
