import { Component, OnInit } from '@angular/core';

// Angular Materials
import { MatDialog } from '@angular/material/dialog';

// Components
import { BookFormDialogComponent } from '../book-form-dialog/book-form-dialog.component';

// Services
import { BookService } from 'src/app/services/book-service/book.service';

// Models
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  columnsToDisplay: string[];
  books: Book[];

  constructor(
    public dialog: MatDialog,
    private bookService: BookService
  ) {
    this.columnsToDisplay = ['name', 'editorial', 'author', 'genre', 'conservation_status_id',
      'state_id', 'edit_action', 'delete_action'];
    this.books = [];
  }

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void {
    this.bookService.get().subscribe(response => {
      this.books = response['data'];
    }, error => {
      console.error(error);
    });
  }

  public openBookFormDialog(book?: Book): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {data: {book: book}, width: '550px'});

    dialogRef.afterClosed().subscribe(result => {
      this.getBooks();
    });
  }

  public deleteBook(book: Book): void {
    this.bookService.delete(book.id).subscribe(response => {
      console.log(response);
      this.getBooks();
    }, error => {
      console.error(error);
    })
  }

}
