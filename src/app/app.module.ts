import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule , MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatTabsModule, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule, MatCardModule, MatMenuModule } from "@angular/material";
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { CustomInterceptor } from './interceptor/custom.interceptor';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { EditMovieComponent } from './movie/edit-movie/edit-movie.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeService } from './service/employee.service';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { DepartmentMapPipe } from './custom-pipes/department-mapper';
import { CustomCounterBlocksComponent } from './resuable-components/custom-counter-blocks/custom-counter-blocks.component';
import { EmployeeComponent } from './employee/employee.component';
import { UploadComponent } from './search-upload/upload.component';
import { CommonModule } from '@angular/common';
import { MovieFilterPipe } from './custom-pipes/movie-filter.pipe';
import { BoldPipe } from './custom-pipes/bold.pipe';
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    MovieListComponent,
    AddMovieComponent,
    EditMovieComponent,
    SignupComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeListComponent,
    DepartmentMapPipe,
    CustomCounterBlocksComponent,
    EmployeeComponent,
    UploadComponent,
    MovieFilterPipe,
    BoldPipe
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [MovieFilterPipe,BoldPipe],
  providers: [MovieFilterPipe,BoldPipe,EmployeeService,{provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
