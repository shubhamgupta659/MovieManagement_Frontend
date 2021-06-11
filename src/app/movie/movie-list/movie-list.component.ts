import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import {Movie} from "../../model/movie.model";
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: any;
  public tabs = [
    {name: 'HINDI', count : 6, color:'rgb(224,57,6)', icon:'developer_mode'},
    {name: 'ENGLISH', count : 2, color:'rgb(224,2,119)', icon:'supervised_user_circle'},
    {name: 'TELUGU', count : 1, color:'rgb(173,7,85)', icon:'account_balance'}
  ]

  constructor(private router: Router, private apiService: MovieService, private sharedDataService : SharedDataService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getMovies()
      .subscribe( data => {
          this.movies = data;
      });
  }

  deleteMovie(movie: Movie): void {
    this.apiService.deleteUser(movie.movieId)
      .subscribe( data => {
        this.movies = this.movies.filter(u => u !== movie);
      })
  };

  editMovie(movie: Movie): void {
    window.localStorage.removeItem("editMovieId");
    window.localStorage.setItem("editMovieId", movie.movieId.toString());
    this.sharedDataService.changeMessage(movie.movieId.toString());
    this.router.navigate(['editMovie']);
  };

}
