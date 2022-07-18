import { singleton } from "tsyringe";
import { DataSource } from "typeorm";

@singleton()
export default class DatabaseManager {
  private connection: DataSource;

  public async getConnection(): Promise<DataSource> {
    if (this.connection === undefined) {
      if (process.env.NODE_ENV === "production") {
        console.log("NODE_ENV is production");
        this.connection = new DataSource({
          type: "postgres",
          host: process.env.PG_HOST,
          port: (<any>process.env.PG_PORT) | 5432,
          username: process.env.PG_USERNAME,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DATABASE,
          entities: [__dirname + "/../**/*.entity.{js,ts}"],
          synchronize: true,
        });
      } else {
        console.log("NODE_ENV is test or development");
        this.connection = new DataSource({
          type: "postgres",
          host: process.env.PG_HOST_TEST,
          port: (<any>process.env.PG_PORT_TEST) | 5432,
          username: process.env.PG_USERNAME_TEST,
          password: process.env.PG_PASSWORD_TEST,
          database: process.env.PG_DATABASE_TEST,
          entities: [__dirname + "/../**/*.entity.{js,ts}"],
          synchronize: true,
        });
      }

      await this.connection
        .initialize()
        .then(() => {
          console.log("Database connected");
        })
        .catch((err) => {
          console.error("Database connection error", err);
        });
    }

    return this.connection;
  }
}
