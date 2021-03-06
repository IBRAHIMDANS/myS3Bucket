import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsString } from 'class-validator';
import { Bucket } from './Bucket';

@Entity()
export class Blob extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    name!: string;

    @Column('text')
    @IsString()
    path!: string;

    @Column('text')
    @IsString()
    size!: string;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @IsDate()
    updatedAt?: Date;

    @ManyToOne(
        () => Bucket,
        bucket => bucket.blobs,
        {
            cascade: true,
            eager: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    )
    bucket!: Bucket;
}
