import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    EventSubscriber,
    InsertEvent,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsEmail, IsString, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@EventSubscriber()
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid?: string;

    @Column('text', { nullable: true })
    @Length(4, 20)
    @IsString()
    nickname?: string;

    @Column('text', { nullable: true, unique: true })
    @IsEmail()
    email?: string;

    @Column('text')
    @Length(4, 100)
    @IsString()
    password?: string;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @IsDate()
    updatedAt?: Date;

    @BeforeInsert()
    hashPassword(): string {
        return (this.password = bcrypt.hashSync(this.password as string, 8));
        // bcrypt.hashSync(this.password as string, 8);
    }
}
