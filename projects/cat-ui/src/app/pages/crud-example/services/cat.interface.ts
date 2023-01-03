import { CatFormListOptions } from "@catrx/ui/form";

export interface CatFilter {
  filter?: string;
}
export interface Cat {
  id?: number;
  photo: string;
  race: string;
  sex: CatSexType;
}
export type CatSexType = 'M' | 'F';
export const CatSexSelectOptions: CatFormListOptions[] = [
  { value: 'M', name: 'Macho' },
  { value: 'F', name: 'Fêmea' },
];
