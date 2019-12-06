import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { User } from './User';

@Entity()
export class Bucket {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', { nullable: true })
    @Length(4, 200)
    @IsString()
    name!: string;

    @ManyToMany(
        type => User,
        user => user.buckets,
        {
            cascade: true,
        },
    )
    @JoinTable()
    user!: User;
}
