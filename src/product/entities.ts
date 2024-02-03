import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ProductSuggestionStatus } from "./types";
import { UserEntity } from "src/user/entities";

@Entity({ name: "company" })
export class CompanyEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.manufacturer)
  products: ProductEntity[];

  @OneToMany(
    () => ProductSuggestionEntity,
    (ProductSuggestion) => ProductSuggestion.manufacturer,
  )
  productSuggestions: ProductSuggestionEntity[];
}

@Entity({ name: "product_suggestion" })
export class ProductSuggestionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CompanyEntity, (company) => company.productSuggestions)
  manufacturer: CompanyEntity;

  @Column()
  shortDescription: string;

  @Column()
  fullDescription: string;

  @Column()
  notes: string;

  @Column({
    type: "enum",
    enum: ProductSuggestionStatus,
    default: ProductSuggestionStatus.PENDING,
  })
  status: ProductSuggestionStatus;

  @ManyToOne(() => UserEntity, (user) => user.productSuggestions)
  author: UserEntity;
}

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
  fullDescription: string;

  @Column()
  averageRating: number;

  @Column()
  reviewCount: number;

  @ManyToOne(() => CompanyEntity, (company) => company.products)
  manufacturer: CompanyEntity;
}
