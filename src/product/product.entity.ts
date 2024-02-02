import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  about: string;
}
