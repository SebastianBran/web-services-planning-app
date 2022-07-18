import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from "class-validator";
import PlanningConstans from "../../common/Constans";
import { Role } from "../../models/User.entity";

export class RegisterDTO {
  @IsString({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  name: string;

  @IsString({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  @IsEmail({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_EMAIL,
  })
  email: string;

  @IsString({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: PlanningConstans.VALIDATION_MESSAGE_IS_STRONG_PASSWORD,
    }
  )
  password: string;

  @IsEnum(Role, {
    message: PlanningConstans.VALIDATION_MESSAGE_IS_ENUM,
  })
  @IsString({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_STRING,
  })
  role: Role;
}
