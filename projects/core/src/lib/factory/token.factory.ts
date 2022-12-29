import { CatEnvironment } from "../environments/cat-environment";

// @dynamic
export class TokenFactory {
  private static token?: string;

  public static init() {
    if (
      !!localStorage.getItem(CatEnvironment.environment?.storageTokenName)
    ) {
      TokenFactory.setToken(
        localStorage.getItem(CatEnvironment.environment?.storageTokenName)
      );
    }
  }

  public static setToken(token: string) {
    localStorage.setItem(CatEnvironment.environment?.storageTokenName, token);
    this.token = token;
  }

  public static getToken() {
    return this.token;
  }

  public static removeToken() {
    localStorage.removeItem(CatEnvironment.environment?.storageTokenName);
    this.token = null;
  }

  public static hasToken() {
    return (
      !!this.token &&
      !!localStorage.getItem(CatEnvironment.environment?.storageTokenName)
    );
  }

  public static logout() {
    this.removeToken();
  }
}
