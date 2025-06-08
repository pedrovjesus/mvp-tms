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
    email: string;
    phone: string;
    cpfCnpj: string;
    address: {
      cep: string;
      number: number;
      complement?: string;
      street: string;
      city: string;
      uf: string;
      neighborhood: string;
    };
  };
  vehicle: {
    vehicle_plate: string;
    model: string;
    year: number;
    brand: string;
    chassi_number: string;
  };
  driver: {
    name: string;
    phone: string;
    email: string;
    cpf: string;
  };
  statusHistory: {
    date: Date;
    status: string;
  }[];
}
