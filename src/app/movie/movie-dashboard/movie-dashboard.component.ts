import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.css']
})
export class MovieDashboardComponent implements OnInit {

  searchControl: FormControl;
  filteredResults$: Observable<string[]>;
  results: any;
  userMovieInfo:any;
  movieDetail: any;
  latestPicks: any; 
  popularPicks: any;
  hideShowLatestPicks :boolean = false;
  userName : String;

  constructor(private apiService: MovieService,private sharedService : SharedDataService) {
    this.searchControl = new FormControl('');
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(data => this.filterResults(typeof data === 'object' ? data[0] : data));
  }

  ngOnInit() {
    this.hideShowLatestPicks = false;
    this.sharedService.user.subscribe(data=>{
      this.userName = data;
      this.apiService.getLatestPicks(this.userName).subscribe(data => {
        this.latestPicks = data;
      });
      this.apiService.getPopularPicks(this.userName).subscribe(data => {
        this.popularPicks = data;
      });
    });
    
  }

  private filterResults(val: any) {
    this.apiService.searchMovieByKeyword(val).subscribe(data => {
      this.results = data;
    });
  }

  private getMovieById(data: any) {
    this.apiService.getMovieRatingForCurrentUser(data[0]).subscribe(data=>{
      this.userMovieInfo = data;
    });
    this.apiService.getMovieById(data[0]).subscribe(data => {
      this.movieDetail = data;
      this.hideShowLatestPicks = true;
    });
  }

  movieFunc(val:string){
    this.apiService.getMovieRatingForCurrentUser(+val).subscribe(data=>{
      this.userMovieInfo = data;
      console.log(data);
    });
    this.apiService.getMovieById(+val).subscribe(data => {
      this.movieDetail = data;
      this.hideShowLatestPicks = true;
    });
  }
}
