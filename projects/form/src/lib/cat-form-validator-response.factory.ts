export class CatFormValidatorResponseFactory {
  public static generate(errorMessage: string) {
    return {
      customError: {
        message: errorMessage
      }
    }
  }
}
