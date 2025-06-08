// uso em pdf service
export interface IOrder {
  id: number;
  origin: string;
  destination: string;
  departureDate: Date;
  arrivalDate: Date;
  status: string;
  createdAt: Date;
  customer: {
    name: string;
  };
  vehicle: {
    plate: string;
  };
  driver: {
    name: string;
  };
  statusHistory: {
    date: Date;
    status: string;
  }[];
}
