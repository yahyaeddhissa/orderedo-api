import { Injectable } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { ReviewEntity } from "./entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Review, ReviewInput } from "./models";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  public static fromEntity(entity: ReviewEntity): Review {
    return entity;
  }

  public static fromEntities(entities: ReviewEntity[]): Review[] {
    return entities.map(ReviewService.fromEntity);
  }

  public async createReview(input: ReviewInput): Promise<Review> {
    const review = await this.reviewRepository.save(input);
    return ReviewService.fromEntity(review);
  }

  public async findReview(
    where: FindOptionsWhere<ReviewEntity>,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where,
      relations: { author: true, product: true },
    });
    return ReviewService.fromEntity(review);
  }

  public async findReviews(
    where: FindOptionsWhere<ReviewEntity>,
  ): Promise<Review[]> {
    const review = await this.reviewRepository.find({
      where,
      relations: { author: true, product: true },
    });
    return ReviewService.fromEntities(review);
  }
}
