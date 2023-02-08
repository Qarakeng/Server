import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Min, Max, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Messages } from './messages';

@Entity('Users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true, nullable: true })
    @MinLength(5)
    @MaxLength(15)
    username: string;

    @Column({ nullable: true })
    first_name: string;
    
    @Column({ nullable: true})
    last_name: string;

    @Column({ nullable: true })
    @MinLength(0)
    @MaxLength(52)
    bio: string

    @Column({ nullable: true, unique: true })
    @IsEmail()
    email: string

    @Column({ nullable: true})
    avatar: string;


    @CreateDateColumn({ name: 'created_at'}) 
    createdAt: Date;
}