import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique(["dialog_name"])
export class Dialogs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dialog_name: string;

}
