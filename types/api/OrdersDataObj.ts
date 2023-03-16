export type OrdersStatus = "pending" | "active" | "_active" | "completed";

export interface OrdersDataObj {
  status: OrdersStatus;
  isSubmit: boolean;
  _id: string;
  clientId: string;
  vendorId: {
    _id: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
  serviceRequestId: {
    _id: string;
    address: string;
    firstName?: string;
  };
  requestApplicationId: string;
  category: string;
  title: string;
  description: string;
  projectDeadline: string;
  amount: number;
  createdAt: number;
  updatedAt: number;
}
