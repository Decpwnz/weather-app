export interface City {
  name: string;
  code: string;
  administrativeDivision: string;
  countryCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type CitiesResponse = City[];
