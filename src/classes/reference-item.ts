import { timeout } from './decorators';

abstract class ReferenceItem {
    // title: string;
    // year: number;

    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');

    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    private _publisher: string;
    #id: number;

    static department = 'Research Dep.';

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    constructor(id: number, public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem...');

        this.#id = id;
    }
    @timeout(5000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);

        console.log(`Department: ${ReferenceItem.department}`);
        // console.log(`Department: ${Object.getPrototypeOf(this).constructor.department}`);
    }

    get id() {
        return this.#id;
    }

    abstract printCitation(): void;
}

export function getObjectProperty<TObject extends object, TKey extends keyof TObject>(
    object: TObject,
    prop: TKey,
): TObject[TKey] | string {
    const value = object[prop];

    return typeof value === 'function' ? (value as Function).name : value;
}

export { ReferenceItem };
