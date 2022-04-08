import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { EditMovieComponent } from './movie/edit-movie/edit-movie.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { AddEmployeeComponent} from './employee/add-employee/add-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeResolver } from './service/employee-resolver.service';
import { EmployeeComponent } from './employee/employee.component';
import { UploadComponent } from './search-upload/upload.component';
import { MovieDashboardComponent } from './movie/movie-dashboard/movie-dashboard.component';
import { LatestPicksComponent } from './movie/movie-dashboard/latest-picks/latest-picks.component';
import { MovieDetailComponent } from './movie/movie-dashboard/movie-detail/movie-detail.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path:'', component: MovieDashboardComponent, canActivate:[AuthGaurdService], data:{role:'USER'}},
  { path:'dashboard', component: MovieDashboardComponent, canActivate:[AuthGaurdService], data:{role:'USER'},
  children:[
    { path:'', component: MovieDashboardComponent},
    { path:'latestPicks', component: LatestPicksComponent},
    { path:'movieDetail', component: MovieDetailComponent}
  ]},
  { path:'viewMovie', component: MovieListComponent, canActivate:[AuthGaurdService], data:{role:'MODERATOR'}},
  { path:'addMovie', component: AddMovieComponent, canActivate:[AuthGaurdService], data:{role:'MODERATOR'}},
  { path:'editMovie', component: EditMovieComponent, canActivate:[AuthGaurdService], data:{role:'MODERATOR'}},
  { path:'employee', component: EmployeeComponent, canActivate:[AuthGaurdService], data:{role:'ADMIN'},
    children:[
      { path:'', component: EmployeeListComponent},
      { path:'viewEmployee', component: EmployeeListComponent},
      { path:'editEmployee/:id', component: EditEmployeeComponent},
      { path:'addEmployee', component: AddEmployeeComponent},
    ]},
  { path:'upload', component: UploadComponent,canActivate:[AuthGaurdService], data:{role:'MODERATOR'}},
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
