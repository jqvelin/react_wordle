import { LetterBoxStatuses } from "./statuses/LetterBoxStatuses";

export class LetterBox {
    status: LetterBoxStatuses = LetterBoxStatuses.UNKNOWN
    letter: string | null
    x: number
    y: number
    constructor(x: number, y: number, letter: string | null){
        this.x = x 
        this.y = y
        this.letter = letter
    }
}