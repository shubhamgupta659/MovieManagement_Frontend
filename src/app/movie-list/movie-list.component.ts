import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from '../service/http-request.service';
import {Movie} from "../model/movie.model";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: any;

  constructor(private router: Router, private apiService: HttpRequestService) { }

  ngOnInit() {
    if(!window.sessionStorage.getItem('token')) {
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
    window.sessionStorage.removeItem("editMovieId");
    window.sessionStorage.setItem("editMovieId", movie.movieId.toString());
    this.router.navigate(['editMovie']);
  };

}
