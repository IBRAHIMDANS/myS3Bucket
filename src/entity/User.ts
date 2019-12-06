import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    EventSubscriber,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Bucket } from './Bucket';
import { IsDate, IsEmail, IsString, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@EventSubscriber()
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column('text', { nullable: true })
    @Length(4, 20)
    @IsString()
    nickname!: string;

    @Column('text', { nullable: true, unique: true })
    @IsEmail()
    email!: string;

    @Column('text', { select: false })
    @Length(4, 100)
    @IsString()
    password!: string;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @IsDate()
    updatedAt!: Date;

    // parce que plusieurs utilisateurs peuvent se connecter sur un bucket
    @ManyToMany(
        type => Bucket,
        bucket => bucket.user,
    )
    buckets!: Bucket[];

    @BeforeInsert()
    hashPassword(salt = 5): string {
        return bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}
