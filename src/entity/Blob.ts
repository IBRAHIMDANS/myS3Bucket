import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsString, Length } from 'class-validator';

@Entity()
export class Blob {
    @PrimaryGeneratedColumn('uuid')
    uuid?: string;

    @Column('text', { nullable: true })
    @Length(4, 20)
    @IsString()
    nickname?: string;

    @Column('text')
    name?: string;

    @Column('text')
    @IsString()
    path?: string;

    @Column('text')
    @IsString()
    size?: string;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @IsDate()
    updatedAt?: Date;
}
