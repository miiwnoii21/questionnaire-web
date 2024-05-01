import { Question } from "../question/question";

export class QuestionCategoryDetail {
    questionCategoryId: string;
    title: string;
    totalQuestion: number;
    level: string;
    timeLimitOfMinuteUnit: number;
    questionInfo: Question[];

    constructor(){
        this.questionCategoryId = '';
        this.title = '';
        this.totalQuestion = 0;
        this.level = '';
        this.timeLimitOfMinuteUnit = 0;
        this.questionInfo = [];
    }
}
