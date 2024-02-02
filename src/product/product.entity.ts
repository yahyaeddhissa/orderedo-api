import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  shortDescription: string;

  @Column()
  longDescription: string;

  @Column()
  averageRating: number;

  @Column()
  reviewCount: number;
}
