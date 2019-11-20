import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid?: string;

    @Column('text')
    nickname?: string;

    @Column('text')
    email?: string;

    @Column('text')
    password?: string;
}
