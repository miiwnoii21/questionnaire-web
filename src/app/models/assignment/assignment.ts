export class Assignment {
    questionCategoryId: string;
    questions: AssignmentQuestion[];
    constructor(){
        this.questionCategoryId = '';
        this.questions = [];
    }
}

export class AssignmentQuestion {
    questionId: string;
    answers: AssignmentAnswer[];
    constructor(){
        this.questionId = '';
        this.answers = [];
    }
}

export class AssignmentAnswer {
    questionAnswerId: string
    constructor(){
        this.questionAnswerId = ''
    }
}