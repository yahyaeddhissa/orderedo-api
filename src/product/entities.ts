import { UserEntity } from "src/user/entities";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  type Relation,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";

export enum ProductStatus {
  PENDING,
  REJECTED,
  PUBLIC,
  REMOVED,
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

  @OneToOne("PendingProductEntity")
  pendingSuggestion: Relation<PendingProductEntity>;

  @OneToOne("PublicProductEntity")
  approvedSuggestion: Relation<PublicProductEntity>;

  @OneToOne("RejectedProductEntity")
  rejectedSuggestion: Relation<RejectedProductEntity>;
}

@Entity({ name: "pending_products" })
export class PendingProductEntity {
  @OneToOne("ProductEntity")
  @JoinColumn()
  product: Relation<ProductEntity>;

  @Column()
  productId: string;

  @OneToOne("UserEntity")
  @JoinColumn()
  author: Relation<UserEntity>;

  @Column()
  authorId: string;
}

@Entity({ name: "public_products" })
export class PublicProductEntity {
  @OneToOne("ProductEntity")
  @JoinColumn()
  product: Relation<ProductEntity>;

  @Column()
  productId: string;

  @OneToOne("UserEntity")
  @JoinColumn()
  approver: Relation<UserEntity>;

  @Column()
  approverId: string;
}

@Entity({ name: "rejected_products" })
export class RejectedProductEntity {
  @OneToOne("ProductEntity")
  @JoinColumn()
  product: Relation<ProductEntity>;

  @Column()
  productId: string;

  @OneToOne("UserEntity")
  @JoinColumn()
  author: Relation<UserEntity>;

  @Column()
  authorId: string;

  @ManyToOne("UserEntity")
  rejector: Relation<UserEntity>;

  @Column()
  rejectorId: string;
}
