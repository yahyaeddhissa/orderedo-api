import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

enum ProductStatus {
  PENDING,
  REJECTED,
  PUBLIC,
}

@Entity({ name: "products" })
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  shortDescription: string;

  @Column("simple-json")
  fullDescription: [
    {
      title: string;
      text: string;
    },
  ];

  @Column({ default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({
    type: "enum",
    enum: ProductStatus,
    default: ProductStatus.PENDING,
  })
  status: ProductStatus;
}
