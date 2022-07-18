import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Audit } from "./Audit.entity";
import { Task } from "./Task.entity";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity({
  name: "users",
})
export class User extends Audit {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column({
    type: "varchar",
    length: 128,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 128,
  })
  email: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({
    type: "varchar",
    length: 128,
  })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
