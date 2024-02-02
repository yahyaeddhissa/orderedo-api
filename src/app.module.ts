import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule as NestGraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { MessageResolver } from "./message.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product/product.entity";
import { ProductModule } from "./product/product.module";

const DatabaseModule = TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: [ProductEntity],
  synchronize: true,
});

const GraphQLModule = NestGraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  typePaths: ["./**/*.graphql"],
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

@Module({
  imports: [DatabaseModule, GraphQLModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, MessageResolver],
})
export class AppModule {}
