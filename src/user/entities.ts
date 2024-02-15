import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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
  isMember: boolean;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];
}

@Entity({ name: "sessions" })
export class SessionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  expiresAt: Date;

  @Column({ unique: true })
  token: string;

  @Column({
    type: "simple-json",
  })
  data: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user: UserEntity;

  @Column()
  userId: string;
}
