import { Column, Entity, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';

class NumericTransform implements ValueTransformer {
  to(value: string) {
    return value;
  }

  from(value: any): any {
    return parseFloat(value);
  }
}
const transformer = new NumericTransform()

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @Column("numeric", { nullable: true, precision: 12, scale: 2, transformer })
  followers: number;

  @Column("numeric", { nullable: true, precision: 12, scale: 2, transformer})
  following: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  link: string;

  @Column({nullable: true})
  description: string;

  @Column("numeric", { nullable: true, precision: 12, scale: 2, transformer })
  postsCount: number;

  @Column("numeric", { nullable: true, precision: 12, scale: 2, transformer })
  avgLikes: number;

  @Column("numeric", { nullable: true, precision: 12, scale: 2, transformer })
  avgComments: number;

  @Column("numeric", { precision: 12, scale: 2, transformer })
  videoViewCountAvg: number;

  @Column({nullable: true})
  tagsDescription: string;

  @Column({nullable: true})
  taggedUsersDescription: string;

  @Column({nullable: true})
  taggedUsers: string;
}