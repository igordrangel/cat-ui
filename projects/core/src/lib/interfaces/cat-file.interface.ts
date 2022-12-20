export interface CatFileInterface {
  filename: string;
  type: string;
  base64: string;
  csvContent?: {[key: string]: any}[];
}
