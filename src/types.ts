import { createCustomer, getBooksByCategory, getBooksByCategoryPromise } from './functions';
import { Author, Book, Person } from './interfaces';

export type Title = string;
// type Author = string;

export type PersonBook = Person & Book;

export type BookProperties = keyof Book;
export type BookOrUndefined = Book | undefined;

export type BookRequiredFields = Required<Book>;
export type UpdatedBook = Partial<Book>;
export type AuthorWoEmail = Omit<Author, 'email'>;
export type CreateCustomerFunctionType = typeof createCustomer;

export type fn = (a: string, b: number, c: boolean) => symbol;
export type Param1<T> = T extends (a: infer R, b: number, c: boolean) => symbol ? R : never;
export type Param2<T> = T extends (a: string, b: infer R, c: boolean) => symbol ? R : never;

export type P1 = Param1<fn>;
export type P2 = Param2<fn>;

export type RequiredProps<T extends object> = {
    [Prop in keyof T]: T[Prop];
};

export type Result<T> = T extends true ? string : number;

export type Unpromisify<T> = T extends Promise<infer R> ? R : never;

type A = Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>;
