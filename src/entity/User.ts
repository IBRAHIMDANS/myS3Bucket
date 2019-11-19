import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn('uuid')
    id: string | undefined;

    @Column('text')
    firstName: string | undefined;

    @Column('text')
    lastName: string | undefined;

    @Column('int')
    age: number | undefined;
}
