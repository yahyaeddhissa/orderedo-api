import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "company" })
export class CompanyEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  shortDescription: string;

  @Column()
  fullDescription: string;
}
