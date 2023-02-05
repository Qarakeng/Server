import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Min, Max, IsEmail } from 'class-validator';

@Entity('Users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true, nullable: true })
    @Min(5)
    @Max(15)
    username: string;

    @Column()
    first_name: string;
    
    @Column({ nullable: true})
    last_name: string;

    @Column({ nullable: true })
    @Max(52)
    bio: string

    @Column({ nullable: true, unique: true })
    @IsEmail()
    email: string


}