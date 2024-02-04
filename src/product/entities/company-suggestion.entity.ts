import { UserEntity } from "src/user/entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SuggestionStatus } from "../types";

@Entity({ name: "company_suggestion" })
export class CompanySuggestionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: SuggestionStatus,
    default: SuggestionStatus.PENDING,
  })
  status: SuggestionStatus;

  @ManyToOne(() => UserEntity, (user) => user.companySuggestions)
  author: UserEntity;

  @Column()
  authorId: string;

  @Column()
  notes: string;
}
