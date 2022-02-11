import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Models
import { Book } from 'src/app/models/book';
import { Loan } from 'src/app/models/loan';

// Services
import { BookService } from 'src/app/services/book-service/book.service';
import { LoanService } from 'src/app/services/loan-service/loan.service';


@Component({
  selector: 'app-rent-book',
  templateUrl: './rent-book.component.html',
  styleUrls: ['./rent-book.component.css']
})
export class RentBookComponent implements OnInit {

  books: Book[];
  loanForm: FormGroup;

  constructor(
    private bookService: BookService,
    private loanService: LoanService
  ){
    this.books = [];
    this.buildLoanForm();
  }

  ngOnInit() {
    this.getBooks();
  }

  // Build a new bookForm
  private buildLoanForm(): void {    
    this.loanForm = new FormGroup({
      username: new FormControl('', Validators.required),
      rental_date: new FormControl(new Date('yyyy/MM/dd'), Validators.required),
      maximum_return_date: new FormControl('', Validators.required),
      book_id: new FormControl('', Validators.required),
    });
  }

  // Get the books
  private getBooks(): void {
    this.bookService.get().subscribe(response => {
      this.books = response['data'];
    }, error => {
      console.error(error);
    });
  }

  // Change book state: Disponible -> No disponible
  private changeStateBook(book: Book): void {
    book.state_id = {id: 2, name: 'No disponible'};
    this.bookService.update(book.id, book).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });

  }

  // Add new loan
  public loanBook(): void {
    let newLoan: Loan = this.loanForm.value;

    this.loanService.post(newLoan).subscribe(response => {
      console.log(response);
      this.changeStateBook(newLoan.book_id);
    }, error => {
      console.error(error);
    });
  }

}
