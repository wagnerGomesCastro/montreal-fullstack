import { hashSync } from 'bcrypt';

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  // @ts-nocheck
  constructor(user?: Partial<UserEntity>) {
    // @ts-ignore
    this.id = user?.id;
    // @ts-ignore
    this.firstName = user?.firstName;
    // @ts-ignore
    this.lastName = user?.lastName;
    // @ts-ignore
    this.email = user?.email;
    // @ts-ignore
    this.password = user?.password;
    // @ts-ignore
    this.createdAt = user?.createdAt;
    // @ts-ignore
    this.updatedAt = user?.updatedAt;
    // @ts-ignore
    this.deletedAt = user?.deletedAt;
  }
}
