import { CatOAuth2ConfigInterface } from "../services/openid/cat-oauth2-config.interface";

export interface CatEnvironmentOAuthInterface extends CatOAuth2ConfigInterface {
  name: string;
}

export interface CatEnvironmentInterface {
  production: boolean;
  storageTokenName?: string;
  storageOpenIDTypeName?: string;
  hostApi?: string;
  oauthConfig?: CatEnvironmentOAuthInterface[];
}

// @dynamic
export class CatEnvironment {
  public static environment: CatEnvironmentInterface;
}
