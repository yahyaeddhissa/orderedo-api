import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule as NestGraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { join } from "path";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ProductModule } from "./product/product.module";
import { ReviewModule } from "./review/review.module";

const DatabaseModule = TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  autoLoadEntities: true,
});

const GraphQLModule = NestGraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), "src/schema.graphql"),
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  include: [UserModule, ProductModule, ReviewModule],
  context: ({ req }: { req: Request }) => ({ req: req }),
});

const EventsModule = EventEmitterModule.forRoot();

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule,
    EventsModule,
    UserModule,
    ProductModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
