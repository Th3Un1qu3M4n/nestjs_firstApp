import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column()
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: false,
    default: 'user',
  })
  role: string;
}
