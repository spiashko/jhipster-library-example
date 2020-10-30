import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBorrowedBook, BorrowedBook } from 'app/shared/model/borrowed-book.model';
import { BorrowedBookService } from './borrowed-book.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book/book.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';

type SelectableEntity = IBook | IClient;

@Component({
  selector: 'jhi-borrowed-book-update',
  templateUrl: './borrowed-book-update.component.html',
})
export class BorrowedBookUpdateComponent implements OnInit {
  isSaving = false;
  books: IBook[] = [];
  clients: IClient[] = [];
  borrowDateDp: any;

  editForm = this.fb.group({
    id: [],
    borrowDate: [],
    book: [],
    client: [],
  });

  constructor(
    protected borrowedBookService: BorrowedBookService,
    protected bookService: BookService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ borrowedBook }) => {
      this.updateForm(borrowedBook);

      this.bookService
        .query({ 'borrowedBookId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IBook[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBook[]) => {
          if (!borrowedBook.book || !borrowedBook.book.id) {
            this.books = resBody;
          } else {
            this.bookService
              .find(borrowedBook.book.id)
              .pipe(
                map((subRes: HttpResponse<IBook>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBook[]) => (this.books = concatRes));
          }
        });

      this.clientService
        .query({ 'borrowedBookId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IClient[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IClient[]) => {
          if (!borrowedBook.client || !borrowedBook.client.id) {
            this.clients = resBody;
          } else {
            this.clientService
              .find(borrowedBook.client.id)
              .pipe(
                map((subRes: HttpResponse<IClient>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IClient[]) => (this.clients = concatRes));
          }
        });
    });
  }

  updateForm(borrowedBook: IBorrowedBook): void {
    this.editForm.patchValue({
      id: borrowedBook.id,
      borrowDate: borrowedBook.borrowDate,
      book: borrowedBook.book,
      client: borrowedBook.client,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const borrowedBook = this.createFromForm();
    if (borrowedBook.id !== undefined) {
      this.subscribeToSaveResponse(this.borrowedBookService.update(borrowedBook));
    } else {
      this.subscribeToSaveResponse(this.borrowedBookService.create(borrowedBook));
    }
  }

  private createFromForm(): IBorrowedBook {
    return {
      ...new BorrowedBook(),
      id: this.editForm.get(['id'])!.value,
      borrowDate: this.editForm.get(['borrowDate'])!.value,
      book: this.editForm.get(['book'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBorrowedBook>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
