import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Min, Max, IsEmail } from 'class-validator';
import { Messages } from './messages';

@Entity('Users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true, nullable: true })
    @Min(5)
    @Max(15)
    username: string;

    @Column({ nullable: true })
    first_name: string;
    
    @Column({ nullable: true})
    last_name: string;

    @Column({ nullable: true })
    @Max(52)
    bio: string

    @Column({ nullable: true, unique: true })
    @IsEmail()
    email: string

    @Column({ nullable: true})
    avatar: string;


    // @OneToMany(( ) => Messages, (message) => message.author)
    // messages: Messages[]

}