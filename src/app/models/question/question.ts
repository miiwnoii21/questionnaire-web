import { Answer } from "../answer/answer";

export class Question {
    questionId: string;
    sequence: number;
    title: string;
    questionAnswerInfo: Answer[];
    constructor(){
        this.questionId = '';
        this.sequence = 0;
        this.title = '';
        this.questionAnswerInfo = [];
    }
}
