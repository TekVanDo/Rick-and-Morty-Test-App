export interface CharactersResponse {
  info: CharactersResponseInfo;
  results: Character[];
}

export interface CharactersResponseInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export enum Status {
  Alive = 'alive',
  Dead = 'dead',
  Unknown = 'unknown'
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Genderless = 'genderless',
  Unknown = 'unknown'
}

export enum Statuses {
  Dead = 'dead',
  Alive = 'alive',
  Unknown = 'unknown'
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  name: string;
  url: string;
}
