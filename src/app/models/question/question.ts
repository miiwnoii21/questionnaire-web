import { Answer } from "../answer/answer";

export class Question {
    questionId: string;
    sequence: bigint;
    title: string;
    questionAnswerInfo: Answer[];
    constructor(){
        this.questionId = '';
        this.sequence = 0n;
        this.title = '';
        this.questionAnswerInfo = [];
    }
}
