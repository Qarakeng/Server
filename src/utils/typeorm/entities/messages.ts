import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";


@Entity('Messages')
export class Messages extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    context: string;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    author: User;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    recipient: User;

    @Column({ nullable: true, select: false })
    recipientId: User['id'];

    @CreateDateColumn({ name: 'created_at'}) 
    createdAt: Date;
}  