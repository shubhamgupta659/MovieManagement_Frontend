import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Movie} from "../model/movie.model";
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}
  baseUrl: string  = 'http://localhost:8081/';

  getMovies() :Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + 'movies/findMovies').pipe(
      //tap(data => console.log(data)),
    );
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

  searchMovieByKeyword(key:String) {
    return this.http.get(this.baseUrl + 'movies/searchByKey/'+key);
  }

}
