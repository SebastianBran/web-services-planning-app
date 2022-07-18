import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Audit } from "./Audit.entity";
import { User } from "./User.entity";

export enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

@Entity({
  name: "tasks",
})
export class Task extends Audit {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 200,
  })
  description: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.TO_DO,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: User;
}
