import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import PlanningConstans from "../../common/Constans";
import { Status } from "../../models/Task.entity";

export class TaskSaveDTO {
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
  description: string;

  @IsEnum(Status, {
    message: PlanningConstans.VALIDATION_MESSAGE_IS_ENUM,
  })
  @IsNotEmpty({
    message: PlanningConstans.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  status: Status;
}
