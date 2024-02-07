import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { UserEntity } from "src/user/entities";
import { CompanyEntity } from "src/company/entities";
import {
  SuggestionStatus,
  SuggestionType,
} from "src/shared/types/suggestion-status";

@Entity({ name: "company_suggestion_data" })
export class CompanySuggestionDataEntity {
  @Column()
  name: string;

  @Column()
  shortDescription: string;

  @Column()
  fullDescription: string;

  @OneToOne("CompanySuggestionEntity")
  @JoinColumn()
  suggestion: Relation<CompanySuggestionEntity>;
}

@Entity({ name: "company_suggestion" })
export class CompanySuggestionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: SuggestionType,
    default: SuggestionType.CREATE,
  })
  type: SuggestionType;

  @Column({
    type: "enum",
    enum: SuggestionStatus,
    default: SuggestionStatus.PENDING,
  })
  status: SuggestionStatus;

  @Column()
  notes: string;

  @ManyToOne("UserEntity")
  @JoinColumn()
  author: Relation<UserEntity>;

  @Column()
  authorId?: string;

  @ManyToOne("CompanyEntity", {
    nullable: true,
  })
  @JoinColumn()
  company?: Relation<CompanyEntity>;

  @Column({ nullable: true })
  companyId?: string;
}
