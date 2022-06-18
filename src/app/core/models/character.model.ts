import { ILocation } from "./location.model";

export interface Origin {
  name: string;
  url: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
