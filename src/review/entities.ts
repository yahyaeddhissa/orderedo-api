import { ProductEntity } from "src/product/entities";
import { TextBlock } from "src/shared/models";
import { UserEntity } from "src/user/entities";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "reviews" })
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne("UserEntity")
  @JoinColumn()
  author: UserEntity;

  @Column()
  authorId: string;

  @ManyToOne("ProductEntity")
  @JoinColumn()
  product: ProductEntity;

  @Column()
  productId: string;

  @Column()
  rating: number;

  @Column()
  title: string;

  @Column({
    type: "simple-json",
  })
  overall: TextBlock[];

  @Column({
    type: "simple-json",
  })
  advantages: TextBlock[];

  @Column({
    type: "simple-json",
  })
  disadvantages: TextBlock[];
}
