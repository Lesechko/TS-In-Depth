import * as Interfaces from '../interfaces';
import { format, freeze, getParameter, logMethod, logger, writable } from './decorators';

// @logger
// @freeze(UniversityLibrarian.name)
class UniversityLibrarian implements Interfaces.Librarian {
    @format() name: string;
    email: string;
    department: string;

    @logMethod
    assistCustomer(@getParameter custName: string, @getParameter bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
    }

    @writable(true)
    assistFaculty() {
        console.log('Assisting Faculty');
    }

    @writable(false)
    teachCommunity() {
        console.log('Teaching Community');
    }
}

export { UniversityLibrarian };
