import { LetterBox } from "./LetterBox"
import { allowedKeys } from "./db/AllowedKeys"
import { fiveLetterWords, fourLetterWords, sixLetterWords } from "./db/WordsDB"

export class MainGameBoard {
    letterBoxQty: number
    letterBoxes: LetterBox[][] = []
    words: string[] = []
    riddledWord: string = ''
    allowedKeys: string[] = allowedKeys
    usedWords: string[] = []
    constructor(letterBoxQty: number){
        this.letterBoxQty = letterBoxQty
        switch(letterBoxQty){
            case 4:
                this.words = fourLetterWords
                break;
            case 5:
                this.words = fiveLetterWords
                break;
            case 6:
                this.words = sixLetterWords
                break;
        }
    }

    initLetterBoxes(){
        for (let y = 0; y < 6; y++){
            const row: LetterBox[] = []
            for (let x = 0; x < this.letterBoxQty; x++){
                row.push(new LetterBox(x, y, null))
            }
            this.letterBoxes.push(row)
        }
    }

    riddleWord(){
        let randomIndex: number
        do {
            randomIndex = Math.floor(Math.random() * (this.words.length - 1))
        } while (this.usedWords.find(word => word === this.words[randomIndex]))
        this.riddledWord = this.words[Math.floor(Math.random() * (this.words.length - 1))]
        this.usedWords.push(this.riddledWord)
    }

    isAllowedLetter(letter: string) {
        if (allowedKeys.includes(letter)) return true
        return false
    }

    getAllIndices(neededValue: any) {
        let indices = [], i = -1;
        while ((i = this.riddledWord.split('').indexOf(neededValue, i+1)) != -1){
            indices.push(i);
        }
        return indices;
    }

    getLetterBox(x: number, y: number){
        return this.letterBoxes[y][x]
    }

    getBoardCopy(){
        const boardCopy = new MainGameBoard(this.letterBoxQty)
        boardCopy.letterBoxes = this.letterBoxes
        boardCopy.words = this.words
        boardCopy.riddledWord = this.riddledWord
        return boardCopy
    }
}