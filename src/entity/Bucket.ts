import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, Length } from 'class-validator';
import { User } from './User';
import { Blob } from './Blob';

@Entity()
export class Bucket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', { nullable: true })
    @Length(4, 200)
    @IsString()
    name!: string;

    @Column('text', { nullable: true })
    @IsString()
    parentId?: string;

    @Column('text', { nullable: true })
    @IsString()
    path?: string;

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

    @OneToMany(
        () => Blob,
        blob => blob.bucket,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    blobs!: Blob[];
}
