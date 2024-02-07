import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  type Relation,
} from "typeorm";
import { CompanyEntity } from "src/company/entities";

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
  manufacturer: Relation<CompanyEntity>;

  @Column()
  manufacturerId: string;
}
