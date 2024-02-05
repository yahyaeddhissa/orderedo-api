import { CompanySuggestionEntity } from "src/company/entities";
import { ProductSuggestionEntity } from "src/product/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
  productSuggestions: ProductSuggestionEntity[];

  @OneToMany(() => CompanySuggestionEntity, (suggestion) => suggestion.author)
  companySuggestions: ProductSuggestionEntity[];
}
