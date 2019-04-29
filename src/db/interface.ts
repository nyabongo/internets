
// eslint-disable-next-line import/prefer-default-export
export interface Model {
  getServiceProviders: () => Promise<any>;
}

export interface Thing {
  id: string;
  name: string;
  description: string;
  website?: string;
  banner: string;
  logo: string;
}

export interface ServiceProvider extends Thing {
  address?: string;
  website: string;
}
