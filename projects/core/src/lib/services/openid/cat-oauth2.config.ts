import { BehaviorSubject } from "rxjs";
import { CatEnvironment } from "../../environments/cat-environment";
import { CatOAuth2ConfigInterface } from "./cat-oauth2-config.interface";

// @dynamic
export class CatOAuth2Config {
  public static config = new BehaviorSubject<CatOAuth2ConfigInterface>(
    CatOAuth2Config.getOAuthConfig(CatOAuth2Config.getConfig())
  );

  public static getConfig() {
    return localStorage.getItem(
      CatEnvironment.environment?.storageOAuthTypeName
    );
  }

  public static hasConfig() {
    return !!this.getConfig();
  }

  public static setConfig(type: string) {
    localStorage.setItem(
      CatEnvironment.environment?.storageOAuthTypeName,
      type
    );
    this.config.next(this.getOAuthConfig(type));
  }

  private static getOAuthConfig(type?: string) {
    const environment =
      CatEnvironment.environment?.oauthConfig?.find(
        (config) => config.name === type
      ) ?? null;

    return (
      environment ?? {
        customQueryParams: {
          client_secret: null,
        },
        clientId: null,
        scope: null,
        domain: null,
        strictDiscoveryDocumentValidation: false,
        indexLoginName: 'name',
      }
    );
  }
}
