import { UserEntity } from "src/user/entities";
import { CompanyEntity } from "src/company/entities";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SuggestionStatus } from "../types";

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
