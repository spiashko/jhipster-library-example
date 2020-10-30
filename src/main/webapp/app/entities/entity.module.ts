import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'publisher',
        loadChildren: () => import('./publisher/publisher.module').then(m => m.LibraryPublisherModule),
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.LibraryAuthorModule),
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.LibraryClientModule),
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.LibraryBookModule),
      },
      {
        path: 'borrowed-book',
        loadChildren: () => import('./borrowed-book/borrowed-book.module').then(m => m.LibraryBorrowedBookModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class LibraryEntityModule {}
