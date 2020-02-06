import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  { path:'', component: MovieListComponent},
  { path:'viewMovie', component: MovieListComponent, canActivate:[AuthGaurdService]},
  { path:'addMovie', component: AddMovieComponent, canActivate:[AuthGaurdService]},
  { path:'editMovie', component: EditMovieComponent, canActivate:[AuthGaurdService]},
  { path:'addemployee', component: EmployeeComponent},
  { path:'viewemployee', component: EmployeeListComponent},
  { path:'signup', component: SignupComponent},
  { path:'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
