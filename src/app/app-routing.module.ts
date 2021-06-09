import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { EditMovieComponent } from './movie/edit-movie/edit-movie.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { AddEmployeeComponent} from './employee/add-employee/add-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeResolver } from './service/employee-resolver.service';

const routes: Routes = [
  { path:'', component: MovieListComponent, canActivate:[AuthGaurdService], data:{role:'USER'}},
  { path:'viewMovie', component: MovieListComponent, canActivate:[AuthGaurdService], data:{role:'USER'}},
  { path:'addMovie', component: AddMovieComponent, canActivate:[AuthGaurdService], data:{role:'USER'}},
  { path:'editMovie', component: EditMovieComponent, canActivate:[AuthGaurdService], data:{role:'USER'}},
  { path:'viewEmployee', component: EmployeeListComponent, canActivate:[AuthGaurdService], data:{role:'ADMIN'}},
  { path:'editEmployee/:id', component: EditEmployeeComponent, canActivate:[AuthGaurdService], data:{role:'USER'}},
  { path:'addEmployee', component: AddEmployeeComponent, canActivate:[AuthGaurdService], data:{role:'USER'}},
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
