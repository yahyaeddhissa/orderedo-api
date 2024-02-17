import { Module } from "@nestjs/common";
import { ReviewResolver } from "./review.resolver";
import { ReviewService } from "./review.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewEntity } from "./entities";

const ReviewEntities = TypeOrmModule.forFeature([ReviewEntity]);

@Module({
  imports: [ReviewEntities],
  providers: [ReviewService, ReviewResolver],
})
export class ReviewModule {}
