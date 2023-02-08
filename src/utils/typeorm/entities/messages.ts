import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";


@Entity('Messages')
export class Messages extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    context: string;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    author: User;

    @Column({ nullable: true, select: false })
    authorId: User['id']

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    recipient: User;

    @Column({ nullable: true, select: false })
    recipientId: User['id'];

    @OneToOne(() => Messages, { nullable: true })
    @JoinColumn()
    isReply: Messages;

    @CreateDateColumn({ name: 'created_at'}) 
    createdAt: Date;
}  