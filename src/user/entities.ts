import {
  CompanySuggestionEntity,
  ProductSuggestionEntity,
} from "src/product/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  isVerified: boolean;

  @Column()
  isMember: boolean;

  @OneToMany(() => ProductSuggestionEntity, (suggestion) => suggestion.author)
  productSuggestions: ProductSuggestionEntity[];

  @OneToMany(() => CompanySuggestionEntity, (suggestion) => suggestion.author)
  companySuggestions: ProductSuggestionEntity[];
}
