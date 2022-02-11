import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RentBookComponent } from './components/rent-book/rent-book.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'not-found', component: NotFoundComponent},
  //{path: '**', redirectTo: 'not-found'},
  {path: 'books', component: BookComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'rent-book', component: RentBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
