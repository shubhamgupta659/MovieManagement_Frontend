import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.css']
})
export class MovieDashboardComponent implements OnInit {

  searchControl: FormControl;
  filteredResults$: Observable<string[]>;
  results : any;

  constructor(private apiService: MovieService) { 
    this.searchControl = new FormControl('');
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(data=>this.filterResults(data));
  }

  ngOnInit() {
  }

  private filterResults(val: string){
    this.apiService.searchMovieByKeyword(val).subscribe(data=>{
      this.results = data;
    });
  }

}
