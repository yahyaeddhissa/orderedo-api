import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductSuggestionEntity } from "./product-suggestion.entity";
import { ProductEntity } from "./product.entity";

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
