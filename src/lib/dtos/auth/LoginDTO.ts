import { IsNotEmpty, IsString } from "class-validator";
import PlanningConstans from "../../common/Constans";

export class LoginDTO {
  @IsString({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  email: string;

  @IsString({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  password: string;
}
