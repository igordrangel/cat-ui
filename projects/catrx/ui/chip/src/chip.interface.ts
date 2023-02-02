export interface CatChipConfig {
  text: string;
  color?: CatChipColor;
}

export type CatChipColor =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'primary'
  | 'secondary';
