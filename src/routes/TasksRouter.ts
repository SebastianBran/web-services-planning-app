import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import express, { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import PlanningConstans from "../lib/common/Constans";
import { SingleResponse } from "../lib/common/responses";
import StringUtils from "../lib/common/StringUtils";
import { TaskSaveDTO } from "../lib/dtos/task/TaskSaveDTO";
import { TaskUpdateDTO } from "../lib/dtos/task/TaskUpdateDTO";
import TaskService from "../lib/services/TaskService";

const router = express.Router();
const taskService = container.resolve(TaskService);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await taskService.getAll();
    const message = StringUtils.format(PlanningConstans.MESSAGE_RESPONSE_GET_SUCCESS, "Tasks");
    const response = SingleResponse(message, true, result);

    res.status(200).send(response);
  }
  catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;

    const result = await taskService.getById(id);
    const message = StringUtils.format(PlanningConstans.MESSAGE_RESPONSE_GET_SUCCESS, "Task");
    const response = SingleResponse(message, true, result);

    res.status(200).send(response);
  }
  catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto: TaskSaveDTO = plainToClass(TaskSaveDTO, req.body);

    const errors = await validate(dto);

    if (errors.length > 0) {
      return next(errors);
    }

    const result = await taskService.create(dto);
    const message = StringUtils.format(PlanningConstans.MESSAGE_RESPONSE_POST_SUCCESS, "Task");
    const response = SingleResponse(message, true, result);

    res.status(201).send(response);
  }
  catch(error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const dto: TaskUpdateDTO = plainToClass(TaskUpdateDTO, req.body);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return next(errors);
    }

    const result = await taskService.update(id, dto);
    const message = StringUtils.format(PlanningConstans.MESSAGE_RESPONSE_PUT_SUCCESS, "Task");
    const response = SingleResponse(message, true, result);

    res.status(201).send(response);
  }
  catch(error) {
    next(error);
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;

    const result = await taskService.delete(id);
    const message = StringUtils.format(PlanningConstans.MESSAGE_RESPONSE_DELETE_SUCCESS, "Task");
    const response = SingleResponse(message, true, result);

    res.status(200).send(response);
  }
  catch(error) {
    next(error);
  }
});

export = router;