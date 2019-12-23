import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, Length } from 'class-validator';
import { User } from './User';

@Entity()
export class Bucket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', { nullable: true })
    @Length(4, 200)
    @IsString()
    name!: string;

    @ManyToOne(
        () => User,
        user => user.uuid,
        {
            cascade: true,
            eager: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinTable()
    user!: User;
}
