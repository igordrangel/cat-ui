import { CatOAuth2ConfigInterface } from "../services/openid/cat-oauth2-config.interface";

export interface CatEnvironmentOAuthInterface
  extends CatOAuth2ConfigInterface {
  name: string;
}

export interface CatEnvironmentInterface {
  production: boolean;
  storageTokenName?: string;
  storageOAuthTypeName?: string;
  endpointApi?: string;
  authenticator?: string;
  oauthConfig?: CatEnvironmentOAuthInterface[];
}

// @dynamic
export class CatEnvironment {
  public static environment: CatEnvironmentInterface;
}
