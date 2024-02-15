import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(
  //   session({
  //     secret: "express-session-secret",
  //     resave: true,
  //     saveUninitialized: false,
  //     store: new SessionStore(),
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
