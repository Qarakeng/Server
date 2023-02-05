import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Messages } from "./messages";
import { User } from "./Users";

@Entity()
export class Convertions {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    creator: User;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    recipient: User;

    // @OneToMany(() => Messages, (message) => message.conversation, {
    //     cascade: ['insert', 'remove', 'update'],
    //   })
    // @JoinColumn()
    // messages: Messages[];


    @CreateDateColumn({ name: 'created_at' })
    createdAt: number;
}