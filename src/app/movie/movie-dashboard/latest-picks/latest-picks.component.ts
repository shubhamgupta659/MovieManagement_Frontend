import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'latest-picks',
  templateUrl: './latest-picks.component.html',
  styleUrls: ['./latest-picks.component.css']
})
export class LatestPicksComponent implements OnInit {
  userMovieInfo:any;
  @Input() value: Array<any>;
  @Output() public movieClickEvent = new EventEmitter();
  constructor(private apiService: MovieService) { }

  ngOnInit() {
    
  }

  showMovieDetails(id:number){
    this.movieClickEvent.emit(id+'');
  }

  watchToggle(ind:number){
    this.value[ind].movieWatchListed = !this.value[ind].movieWatchListed;
    this.apiService.getMovieRatingForCurrentUser(this.value[ind].movieId).subscribe(data=>{
      this.userMovieInfo = data;
      this.userMovieInfo.watchListed = !this.userMovieInfo.watchListed;
      this.apiService.saveMovieDetailForCurrentUser(this.userMovieInfo).subscribe(data=>{
        this.value[ind].movieWatchListed = this.value[ind].movieWatchListed;
      });
    });
    
  }

}
