export class CatXlsxConfig {
  static config: CatXlsxConfigInterface = {
    headerBackgroundColor: '#ffffff',
    headerFontColor: '#000000',
    normalizeHeader: true
  };
}

export interface CatXlsxConfigInterface {
  headerFontColor?: string;
  headerBackgroundColor?: string;
  password?: string;
  normalizeHeader?: boolean;
}
