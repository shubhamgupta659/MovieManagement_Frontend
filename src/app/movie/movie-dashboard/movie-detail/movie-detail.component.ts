import { Component, Input, OnInit } from '@angular/core';
import { StarRatingColor } from 'src/app/resuable-components/star-rating/star-rating.component';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  @Input() value: any;
  @Input('userMovieInfo') userMovieInfo: any;
  rating:any =0;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private apiService: MovieService) { }

  ngOnInit() {
  }

  onRatingChanged(rating){
    this.userMovieInfo.rating = rating;
    this.apiService.saveMovieDetailForCurrentUser(this.userMovieInfo).subscribe(data=>{
      this.userMovieInfo.rating = rating;
    });
  }

  watchToggle(){
    this.userMovieInfo.watchListed = !this.userMovieInfo.watchListed;
    this.apiService.saveMovieDetailForCurrentUser(this.userMovieInfo).subscribe(data=>{
      this.userMovieInfo.watchListed = this.userMovieInfo.watchListed;
    });
  }

}
