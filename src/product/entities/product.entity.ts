import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CompanyEntity } from "../../company/entities/company.entity";

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
