
// eslint-disable-next-line import/prefer-default-export
export interface Model {
  getServiceProviders: () => Promise<any>;
  getServiceProviderById: (id: string) => Promise<ServiceProvider>;
  getServiceById: (id: string) => Promise<Service>;
  getProviderServices: (id: string) => Promise<Service[]>;
}

export interface Thing {
  id: string;
  name: string;
  description: string;
  website?: string;
  banner?: string;
  logo?: string;
}

export interface ServiceProvider extends Thing {
  logo: string;
  banner: string;
  address?: string;
  website: string;
}

export interface Service extends Thing {
  providerId: string;
  technology: string[];
}

export interface Plan extends Thing {
  providerId: string;
  serviceId: string;
  price: {
    value: number;
    currency: string;
    relativeMagnitude: number;
  };
  volume: {
    value: number | 'Unlimited';
    unit: string;
    relativeMagnitude: number;
  };
  duration: {
    value: number;
    unit: string;
    relativeMagnitude: number;
  };
}
