import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    user_id: number;

    @Column()
    dialog_id: number;

    @Column()
    timestamp: Date;

    @Column()
    delivered: boolean;

    @Column()
    seen: boolean;

}
