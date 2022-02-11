import { Component, OnInit} from '@angular/core';

// Models
import { Book } from 'src/app/models/book';
import { Loan } from 'src/app/models/loan';
import { BookService } from 'src/app/services/book-service/book.service';

// Services
import { LoanService } from 'src/app/services/loan-service/loan.service';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  displayedColumns: string[];
  loans: Loan[];

  constructor(
    private loanService: LoanService,
    private bookService: BookService
  ) {
    this.displayedColumns = ['username', 'book_id', 'rental_date', 'maximum_return_date',
      'return_date', 'remove_action'];
    this.loans = [];
  }

  ngOnInit() {
    this.getLoans();
  }

  // Get all loans
  private getLoans(): void {
    this.loanService.get().subscribe(response => {
      this.loans = response['data'];
    }, error => {
      console.error(error);
    });
  }

   // Change book state: No disponible -> Disponible
   private changeStateBook(book: Book): void {
    book.state_id = {id: 1, name: 'Disponible'};
    this.bookService.update(book.id, book).subscribe(response => {
      console.log(response);
      this.getLoans();
    }, error => {
      console.error(error);
    });
    
  }
  
  // Delete the loan
  public returnBook(loan: Loan): void {
    this.loanService.delete(loan.id).subscribe(response => {
      console.log(response);
      this.changeStateBook(loan.book_id);
    }, error => {
      console.error(error);
    });
  }

}

