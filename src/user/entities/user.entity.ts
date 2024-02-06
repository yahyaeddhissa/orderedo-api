import { CompanySuggestionEntity } from "src/company/entities";
import { ProductSuggestionEntity } from "src/product/entities";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isMember: boolean;

  @OneToMany(() => ProductSuggestionEntity, (suggestion) => suggestion.author)
  productSuggestions?: Relation<ProductSuggestionEntity>[];

  @OneToMany(() => CompanySuggestionEntity, (suggestion) => suggestion.author)
  companySuggestions?: Relation<ProductSuggestionEntity>[];
}
