import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity, ProductSuggestionEntity } from "src/product/entities";
import { CompanySuggestionEntity } from ".";

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

  @OneToMany(() => CompanySuggestionEntity, (suggestion) => suggestion.company)
  suggestions?: CompanySuggestionEntity[];
}
