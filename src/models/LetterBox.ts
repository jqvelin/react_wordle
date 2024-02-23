import { LetterBoxStatuses } from "./statuses/LetterBoxStatuses";

export class LetterBox {
    status: LetterBoxStatuses = LetterBoxStatuses.UNKNOWN
    letter: string
    constructor(letter: string){
        this.letter = letter
    }
}