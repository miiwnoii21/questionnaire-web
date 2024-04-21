export class Answer {
    questionAnswerId: string;
    sequence: bigint;
    answer: string;

    constructor(){
        this.questionAnswerId = '';
        this.sequence = 0n;
        this.answer = '';
    }
}
