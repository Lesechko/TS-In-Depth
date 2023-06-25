import { ReferenceItem } from '../classes';
import { positiveInteger } from './decorators';

export default class extends ReferenceItem {
    private _copies: number;

    get copies() {
        return this._copies;
    }

    @positiveInteger
    set copies(value: number) {
        this._copies = value;
    }

    constructor(id: number, title: string, year: number, public edition: string) {
        super(id, title, year);
    }

    override printItem(): void {
        super.printItem();
        console.log(`Editiond: ${this.edition} ${this.year}`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}
