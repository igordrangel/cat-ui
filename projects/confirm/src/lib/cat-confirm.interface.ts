import { CatDynamicComponent } from "@catrx/ui/dynamic-component";

export type ConfirmType = 'yes' | 'no';
export interface ConfirmResponse {
  answer: ConfirmType;
}
export interface ConfirmOptions {
  noCb?: () => void;
  icon?: CatDynamicComponent;
}
export interface ConfirmData {
  question: string;
  icon?: CatDynamicComponent;
}
