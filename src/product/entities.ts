import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { SuggestionStatus } from "./types";
import { UserEntity } from "src/user/entities";

@Entity({ name: "company_suggestion" })
export class CompanySuggestionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: SuggestionStatus,
    default: SuggestionStatus.PENDING,
  })
  status: SuggestionStatus;

  @ManyToOne(() => UserEntity, (user) => user.companySuggestions)
  author: UserEntity;

  @Column()
  authorId: string;

  @Column()
  notes: string;
}

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
    (suggestion) => suggestion.manufacturer,
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
  manufacturerId: string;

  @Column()
  shortDescription: string;

  @Column()
  fullDescription: string;

  @Column()
  notes: string;

  @Column({
    type: "enum",
    enum: SuggestionStatus,
    default: SuggestionStatus.PENDING,
  })
  status: SuggestionStatus;

  @ManyToOne(() => UserEntity, (user) => user.productSuggestions)
  author: UserEntity;

  @Column()
  authorId: string;
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

  @Column()
  manufacturerId: string;
}
