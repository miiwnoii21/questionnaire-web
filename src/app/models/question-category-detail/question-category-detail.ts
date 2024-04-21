import { Question } from "../question/question";

export class QuestionCategoryDetail {
    questionCategoryId: string;
    title: string;
    totalQuestion: bigint;
    level: string;
    timeLimitOfMinuteUnit: bigint;
    questionInfo: Question[];

    constructor(){
        this.questionCategoryId = '';
        this.title = '';
        this.totalQuestion = 0n;
        this.level = '';
        this.timeLimitOfMinuteUnit = 0n;
        this.questionInfo = [];
    }
}
