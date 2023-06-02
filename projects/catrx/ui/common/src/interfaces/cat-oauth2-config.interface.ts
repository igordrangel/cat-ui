export interface CatOAuth2ConfigInterface {
  clientId: string;
  scope: string;
  domain: string;
  indexLoginName: string;
  indexPictureName?: string;
  customQueryParams?: object;
  strictDiscoveryDocumentValidation?: boolean;
  endpointLogout?: string;
  endpointToken?: string;
  endpointClaims?: string;
  responseType?: string;
}
