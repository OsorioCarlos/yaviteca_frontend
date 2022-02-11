import { Book } from "./book";

export interface Loan {
    id: number;
    username: string;
    book_id: Book;
    rental_date: Date;
    maximum_return_date: Date;
    return_date?: Date;
    is_deleted: boolean;
}