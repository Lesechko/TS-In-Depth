import { Category } from './enum';
import { Book, LibMgrCallback } from './interfaces';
import { BookOrUndefined, BookProperties, Result, Title } from './types';
import RefBook from './classes/encyclopedia';

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    const firstAvailableBook = books.find(book => book.available);

    console.log(`Books in the array : ${books.length}, first available book: ${firstAvailableBook.title}`);
}

export function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
    return getAllBooks()
        .filter(book => book.category === category)
        .map(book => book.title);
}

export function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(index: number): [Title, string] {
    const book = getAllBooks()[index];

    return [book.title, book.author];
}

export function calcTotalPages(): BigInt {
    return [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ].reduce((acc, lib) => {
        return acc + BigInt(lib.books * lib.avgPagesPerBook);
    }, 0n);
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`Customer name: ${age}`);
    }

    if (city) {
        console.log(`Customer name: ${city}`);
    }
}

export function getBookById(id: Book['id']): BookOrUndefined {
    const books = getAllBooks();

    return books.find(book => book.id === id);
}

export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer: ${customer}`);

    return bookIDs
        .map(id => getBookById(id))
        .filter(book => book.available)
        .map(book => book.title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];

export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
    const books = getAllBooks();

    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg).map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg).map(book => book.title);
        }
    } else {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }

    return [];
}

getTitles(1, true);

// Asserts
export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function assertRefBookInstance(conditions: any): asserts conditions {
    if (!conditions) {
        throw new Error('It is not an instance of RefBook');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);

    return [...title].reverse().join('');
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getBookProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];

    return typeof value === 'function' ? value.name : value;
}

export function getAllBooks(): readonly Book[] {
    return <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript,
        },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.JavaScript },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript,
        },
    ];
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

export function update<T extends boolean>(isStringOutput: T): Result<T> {
    if (isStringOutput) {
        return '123' as Result<T>;
    } else {
        return 123 as Result<T>;
    }
}
export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);

            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No Books Found');
            }
        } catch (err) {
            callback(err, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);

            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No Books Found');
            }
            resolve(null);
        }, 2000);
    });

    return p;
}

export async function logSearchResults(category: Category): Promise<void> {
    try {
        const titles = await getBooksByCategoryPromise(category);
        console.log(titles.length);
    } catch {
        console.log(0);
    }
}
