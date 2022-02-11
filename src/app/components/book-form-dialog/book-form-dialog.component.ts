import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Angular Materials
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Services
import { BookService } from 'src/app/services/book-service/book.service';
import { StateService } from 'src/app/services/state-service/state.service';
import { ConservationStatusService } from 'src/app/services/conservation-status-service/conservation-status.service';

// Models
import { Book } from 'src/app/models/book';
import { State } from 'src/app/models/state';
import { ConservationStatus } from 'src/app/models/conservation-status';

@Component({
  selector: 'app-book-form-dialog',
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.css']
})
export class BookFormDialogComponent implements OnInit {
  conservationStatuses: ConservationStatus[];
  states: State[];
  bookForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {book: Book},
    private bookService: BookService,
    private conservationStatusService: ConservationStatusService,
    private stateService: StateService
  ) {
    this.conservationStatuses = [];
    this.states = [];

    if (this.data.book) {
      this.buildFillBookForm();
    } else {
      this.buildVoidBookForm();
    }
  }

  ngOnInit(): void {
    this.getConservationStatuses();
    this.getStates();
  }

  // Get the statues in the API
  private getStates(): void {
    this.stateService.get().subscribe(response => {
      this.states = response['data'];
    }, error => {
      console.error(error);
    });
  }
      
  // Get the conservation statuses in the API
  private getConservationStatuses(): void {
    this.conservationStatusService.get().subscribe(response => {
      this.conservationStatuses = response['data'];
    }, error => {
      console.error(error);
    });
  }

  // Build a new bookForm
  private buildVoidBookForm(): void {    
    this.bookForm = new FormGroup({
      isbn: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      editorial: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      conservation_status_id: new FormControl('', Validators.required),
      state_id: new FormControl('', Validators.required),
    });
  }

  // Build a bookForm with data
  private buildFillBookForm(): void {
    let book: Book = this.data.book;

    this.bookForm = new FormGroup({
      isbn: new FormControl(book.isbn, Validators.required),
      name: new FormControl(book.name, Validators.required),
      editorial: new FormControl(book.editorial, Validators.required),
      author: new FormControl(book.author, Validators.required),
      genre: new FormControl(book.genre, Validators.required),
      conservation_status_id: new FormControl(book.conservation_status_id, Validators.required),
      state_id: new FormControl(book.state_id, Validators.required),
    });
  }

  // Save the new book in the API (create)
  public saveNewBook(): void {
    let newBook: Book = this.bookForm.value;
    newBook.creation_date = new Date();

    this.bookService.post(JSON.stringify({book: newBook})).subscribe(response => {
      this.buildVoidBookForm();
    }, error => {
      console.error(error);
    });
  }

  // Save the book in the API (update)
  public saveBook(): void {
    let book: Book = this.data.book;
    book.isbn = this.bookForm.value['isbn'];
    book.name = this.bookForm.value['name'];
    book.editorial = this.bookForm.value['editorial'];
    book.author = this.bookForm.value['author'];
    book.genre = this.bookForm.value['genre'];
    book.conservation_status_id = this.bookForm.value['conversation_status_id'];
    book.state_id = this.bookForm.value['state_id'];

    this.bookService.update(book.id, JSON.stringify({book: book})).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

}
