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

    // @Column('text', { nullable: true })
    // @Length(4, 20)
    // @IsString()
    // nickname!: string;

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
        type => Bucket,
        bucket => bucket.id,
        {
            cascade: true,
            eager: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    )
    bucket!: Bucket;
}
