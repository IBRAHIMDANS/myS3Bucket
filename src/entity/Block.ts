import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsString, Length } from 'class-validator';
import { User } from './User';

@Entity()
export class Block extends User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('text', { nullable: true })
    @Length(4, 20)
    @IsString()
    name?: string;
}