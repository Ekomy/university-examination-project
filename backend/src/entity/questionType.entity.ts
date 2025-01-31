import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionTypeInterface } from '../api/questionType/interfaces/questionType.interface';

@Entity("questionType")
export class questionTypeEntity implements QuestionTypeInterface {

    @PrimaryGeneratedColumn('uuid')
    question_type_id: string;

    @Column({length: 45})
    name: string;

    
}
