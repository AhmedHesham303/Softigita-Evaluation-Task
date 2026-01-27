interface BreedAttributes {
  name: string;
  description: string;
}

export interface Breed {
  id?: string;
  type?: string;
  attributes?: BreedAttributes;
}
