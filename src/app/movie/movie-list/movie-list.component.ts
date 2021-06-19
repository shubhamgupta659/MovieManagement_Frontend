import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { Movie } from "../../model/movie.model";
import { SharedDataService } from 'src/app/service/shared-data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NotificationService } from 'src/app/service/notification.service';
import { MovieFilterPipe } from 'src/app/custom-pipes/movie-filter.pipe';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  searchControl: FormControl;
  filteredResults$: Observable<string[]>;
  results : any;
  movies: any;
  idFilter: number;
  nameFilter: string;
  ratingFilter: string;
  languageFilter: string;
  public tabs = [
    { name: 'HINDI', count: 0, color: 'rgb(224,57,6)', icon: 'developer_mode' }
  ];
  displayedColumns: string[] = ['movieId', 'movieName', 'rating', 'language', 'update', 'delete'];
  public newtab = new Array();
  public selectedModule: String = '';
  public dataSource: MatTableDataSource<Movie>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private apiService: MovieService,
    private sharedDataService: SharedDataService, private notificationService: NotificationService,
    private moviefilterPipe: MovieFilterPipe) {

    this.searchControl = new FormControl('');
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(data=>this.filterResults(data));
    }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getCountsByLanguage().subscribe(
      list => {
        this.setTabData(list);
      });
    this.apiService.getMovies()
      .subscribe(data => {
        this.movies = data;
        this.dataSource = new MatTableDataSource<Movie>(this.movies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public setTabData(list: any) {
    for (var i = 0; i < list.length; i++) {
      const tab = { 'name': list[i][0], 'count': list[i][1], 'color': 'rgb(33, 150, 243)', 'icon': 'developer_mode' };
      this.newtab.push(tab);
    }
  }
  
  private filterResults(val: string){
    this.apiService.searchMovieByKeyword(val).subscribe(data=>{
      this.results = data;
    });
  }
  
  public redirectToDelete = (row: any) => {
    this.apiService.deleteUser(row.movieId)
      .subscribe(data => {
        this.movies = this.movies.filter(u => u.movieId !== row.movieId);
        this.dataSource = new MatTableDataSource<Movie>(this.movies);
        this.newtab = [];
        this.apiService.getCountsByLanguage().subscribe(
          list => {
            this.setTabData(list);
          });
        this.notificationService.success('Movie Deleted successfully');

      })

  }

  public redirectToUpdate(row: any) {
    this.sharedDataService.changeMessage(row.movieId.toString());
    this.router.navigate(['editMovie']);
  }

  clearFilter(): void {
    this.idFilter = null;
    this.nameFilter = "";
    this.ratingFilter = "";
    this.languageFilter = "";
    this.applyFilter();
  }

  applyFilter() {
    var filteredItems: Movie[] = this.moviefilterPipe.transform(this.movies,
      this.idFilter, this.nameFilter, this.ratingFilter, this.languageFilter);
    this.dataSource = new MatTableDataSource(filteredItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public tabClick(module: any) {
    this.selectedModule = module;
    this.dataSource.filter = this.selectedModule.trim().toLocaleLowerCase();
  }

  public redirectToAdd() {
    this.router.navigate(['/addMovie']);
  }
}
