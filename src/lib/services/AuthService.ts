import { container, singleton } from "tsyringe";
import BusinessError from "../common/BussinessError";
import PlanningConstans from "../common/Constans";
import { RegisterDTO } from "../dtos/auth/RegisterDTO";
import { User } from "../models/User.entity";
import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@singleton()
export default class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = container.resolve(UserRepository);
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      let isValidPassword = false;
      if (user) {
        isValidPassword = await bcrypt.compare(password, user.password);
      }

      if (!user || !isValidPassword) {
        const errorMessage = PlanningConstans.MESSAGE_INVALID_EMAIL_OR_PASSWORD;
        const invalidCredentialsError = new BusinessError(errorMessage, 400);
        return Promise.reject(invalidCredentialsError);
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: process.env.ACCESS_EXPIRES_IN,
        }
      );

      const response = {
        accessToken,
      };

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async register(dto: RegisterDTO): Promise<any> {
    try {
      const countEmail = await this.userRepository.count({
        where: {
          email: dto.email,
        },
      });

      if (countEmail > 0) {
        const errorMessage = PlanningConstans.MESSAGE_EXISTING_EMAIL;
        const existingEmailError = new BusinessError(errorMessage, 400);
        return Promise.reject(existingEmailError);
      }

      const user = new User();

      user.name = dto.name;
      user.email = dto.email;
      user.role = dto.role;

      const saltRounds = +(process.env.ACCESS_SALT_ROUNDS as string);
      const encryptedPassword = await bcrypt.hash(dto.password, saltRounds);

      user.password = encryptedPassword;

      const entity = await this.userRepository.save(user);

      const payload = {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        role: entity.role,
      };

      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: process.env.ACCESS_EXPIRES_IN,
        }
      );

      const response = {
        accessToken,
      };

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
