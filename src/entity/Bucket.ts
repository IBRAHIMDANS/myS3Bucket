import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsString, Length } from 'class-validator';
import { User } from './User';

@Entity()
export class Bucket extends User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('text', { nullable: true })
    @Length(4, 20)
    @IsString()
    name?: string;
}