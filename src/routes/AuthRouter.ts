import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import express, { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import PlanningConstans from "../lib/common/Constans";
import { SingleResponse } from "../lib/common/responses";
import { LoginDTO } from "../lib/dtos/auth/LoginDTO";
import { RegisterDTO } from "../lib/dtos/auth/RegisterDTO";
import AuthService from "../lib/services/AuthService";

const router = express.Router();
const authService = container.resolve(AuthService);

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = plainToClass(LoginDTO, req.body);

    const errors = await validate(dto);

    if (errors.length > 0) {
      return next(errors);
    }

    const result = await authService.login(dto.email, dto.password);
    const message = PlanningConstans.MESSAGE_LOGIN_SUCCESS;
    const response = SingleResponse(message, true, result);

    res.status(200).json(response);
  }
  catch(error) {
    next(error);
  }
});

router.post("/register", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const dto = plainToClass(RegisterDTO, req.body);

    const errors = await validate(dto);

    if (errors.length > 0) {
      return next(errors);
    }

    const result = await authService.register(dto);
    const message = PlanningConstans.MESSAGE_REGISTER_SUCCESS;
    const response = SingleResponse(message, true, result);

    res.status(200).send(response);
  }
  catch(error) {
    next(error);
  }
});

export = router;