import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule as NestGraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";
import { join } from "path";
import { CompanyModule } from "./company/company.module";

const DatabaseModule = TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  autoLoadEntities: true,
  synchronize: true,
});

const GraphQLModule = NestGraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), "src/schema.graphql"),
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  include: [UserModule, ProductModule, CompanyModule],
});

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule,
    UserModule,
    ProductModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
