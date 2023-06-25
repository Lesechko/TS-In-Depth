import { UL, RefBook, Shelf, getObjectProperty } from './classes';
import type { Library } from './classes';
import { Category } from './enum';
import {
    checkoutBooks,
    createCustomer,
    getBookProperty,
    getBooksByCategory,
    getBooksByCategoryPromise,
    logCategorySearch,
    logSearchResults,
    printRefBook,
    purge,
} from './functions';
import { Book, TOptions, Logger, Author, Librarian, Magazine } from './interfaces';
import { BookRequiredFields, CreateCustomerFunctionType, PersonBook, UpdatedBook } from './types';
import Encyclopedia from './classes/encyclopedia';

const myBooks = checkoutBooks('Anna', 1, 2, 4);

// Task 04.01
const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    markDamaged(reason) {
        console.log(`Damaged: ${reason}`);
    },
    // year: 2015,
    // copies: 3,
};

// Task 04.02
const logDamage: Logger = reason => {
    console.log(`Damaged: ${reason}`);
};

// const ref = new ReferenceItem(1, 'Learn TS', 2023);

const favoriteAuthor: Author = {
    name: 'Anna',
    email: 'anna.gmail.com',
    numBooksPublished: 2,
};

const favoriteLibrarian: Librarian = {
    name: 'Anna',
    email: 'anna.gmail.com',
    department: 'Classical Literature',
    assistCustomer(custName, bookTitle) {
        console.log(`${custName} ${bookTitle}`);
    },
};

const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

console.log(offer.magazine);
console.log(offer.magazine?.getTitle());
console.log(offer.book.getTitle?.());
console.log(offer.book.authors?.[0]);
console.log(offer.book.authors?.[0]?.name);

// Task 04.05
console.log(getBookProperty(myBook, 'title'));
console.log(getBookProperty(myBook, 'markDamaged'));

const refBook = new RefBook(1, '', 2014, '');
const favoriteLibrarian2: Librarian = new UL.UniversityLibrarian();
favoriteLibrarian2.name = 'Anna';

// Task 05.05
const personBook: PersonBook = {
    name: 'Book',
    email: '',
    id: 3,
    title: 'Book',
    category: Category.HTML,
    author: '',
    available: true,
};

function setDefaultConfig(options: TOptions): TOptions {
    options.duration ??= 100;
    options.speed ??= 60;

    return options;
}

// Task 06.03
const refBook2 = new RefBook(1, '', 2014, '');
printRefBook(refBook2);

const ul = new UL.UniversityLibrarian();
// printRefBook(ul); err

// Task 06.05
const isBolean = true;

if (isBolean) {
    // import('./classes')
    //     .then(m => {
    //         const reader = new m.Reader();
    //         reader.name = 'Anna';

    //         console.log(reader);
    //     })
    //     .catch(err => console.log(err));

    const m = await import('./classes');
    const reader = new m.Reader();
    reader.name = 'Boris';
    console.log(reader);
}

// Task 06.06

// let lib: Library = new Library();
let lib: Library = { id: 2, name: 'Boris', address: 'London' };

// Task 07.01
const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];

// const r1 = purge(inventory);
// const r2 = purge([1, 2, 3, 4]);

// const purgeNumbers = purge<number>;

// console.log(purgeNumbers([1, 2, 3]));
// console.log(purgeNumbers([1, "4", 3])); err with string

// Task 07.02

const bookShelf = new Shelf<Book>();

inventory.forEach(book => bookShelf.add(book));
console.log(bookShelf.getFirst());

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' },
];

const magazineShelf = new Shelf<Magazine>();
magazines.forEach(magazine => magazineShelf.add(magazine));
console.log(magazineShelf.getFirst());

// Task 07.03
magazineShelf.printTitles();
console.log(magazineShelf.find('Five points'));
console.log(getObjectProperty(magazines[0], 'title'));

// Task 07.04

const bookRequiredFields: BookRequiredFields = {
    author: 'Anna',
    available: true,
    category: Category.Angular,
    id: 1,
    pages: 3,
    title: 'Unknown',
    markDamaged: () => {},
};

const updatedBook: UpdatedBook = {};
const params: Parameters<CreateCustomerFunctionType> = ['Anna'];
createCustomer(...params);

const encyclopedia = new Encyclopedia(123, 'Type 1', 2021, 'Editor 1');
encyclopedia.printItem();
// encyclopedia.printCitation();

// Task 08.05 / 08.06
const ul2 = new UL.UniversityLibrarian();
ul2.name = 'Anna';
ul2.assistCustomer('Boris', 'Learn TS');
console.log(ul2);

// Task 08.07
const refBook3 = new RefBook(1, 'Learn TS', 2023, '2');
// refBook3.copies = -2;

// Task 09.01
// console.log('Begin');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);
// console.log('End');

console.log('Begin');
getBooksByCategoryPromise(Category.JavaScript)
    .then(data => {
        console.log(data);
        return data.length;
    })
    .then(length => {
        console.log(length);
    })
    .catch(reason => console.log(reason));

getBooksByCategoryPromise(Category.Software)
    .then(data => console.log(data))
    .catch(reason => console.log(reason));
console.log('End');

// Task 09.03
console.log('Begin');
logSearchResults(Category.JavaScript);
logSearchResults(Category.Software);
console.log('End');
