import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Movie} from "../model/movie.model";
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}
  baseUrl: string  = 'http://localhost:8081/';

  getMovies() {
    return this.http.get(this.baseUrl + 'movies/findMovies');
  }

  addMovies(movie: Movie) {
    return this.http.post(this.baseUrl + 'movies/insertMovie',movie);
  }

  getMovieById(id: number) {
    return this.http.get(this.baseUrl + 'movies/findMovies/' + id);
  }

  updateUser(movie: Movie) {
    return this.http.put(this.baseUrl + 'movies/updateMovie/' + movie.movieId , movie);
  }

  deleteUser(id: number){
    return this.http.delete(this.baseUrl + 'movies/removeMovie/' + id );
  }

  getCountsByLanguage() {
    return this.http.get(this.baseUrl + 'movies/countByLanguage');
  }
}
