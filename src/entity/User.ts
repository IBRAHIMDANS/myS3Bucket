import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    firstName: string | undefined;

    @Column()
    lastName: string | undefined;

    @Column()
    age: number | undefined;

}
