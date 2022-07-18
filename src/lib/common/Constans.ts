export default class PlanningConstans {
  public static readonly VALIDATION_MESSAGE_IS_INT = "$property must be an integer";
  public static readonly VALIDATION_MESSAGE_IS_STRING = "$property must be a string";
  public static readonly VALIDATION_MESSAGE_IS_ENUM = "$property must be a valid enum";
  public static readonly VALIDATION_MESSAGE_IS_NOT_EMPTY: string = "$property must not be empty";
  public static readonly VALIDATION_MESSAGE_IS_EMAIL: string = "$property must be a valid email";
  public static readonly VALIDATION_MESSAGE_IS_STRONG_PASSWORD: string = "$property must be a strong password";

  public static readonly MESSAGE_RESPONSE_GET_SUCCESS : string = "{0}: Get success";
  public static readonly MESSAGE_RESPONSE_POST_SUCCESS : string = "{0}: Register success";
  public static readonly MESSAGE_RESPONSE_PUT_SUCCESS : string = "{0}: Update success";
  public static readonly MESSAGE_RESPONSE_DELETE_SUCCESS : string = "{0}: Delete success";
  public static readonly MESSAGE_RESPONSE_NOT_FOUND : string = "The object {0} with id: {1} was not found";

  public static readonly MESSAGE_EXISTING_EMAIL : string = "The email is already registered";

  public static readonly MESSAGE_REGISTER_SUCCESS : string = "User registered successfully";
  public static readonly MESSAGE_LOGIN_SUCCESS : string = "User logged successfully";
  public static readonly MESSAGE_LOGOUT_SUCCESS : string = "User logged out successfully";
  public static readonly MESSAGE_INVALID_EMAIL_OR_PASSWORD : string = "Invalid email or password";

  public static readonly MESSAGE_NO_TOKEN_PROVIDED : string = "No token provided";
  public static readonly MESSAGE_INVALID_TOKEN : string = "Invalid token, please login again";
}