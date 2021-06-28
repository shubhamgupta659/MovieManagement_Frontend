import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Movie } from "../model/movie.model";
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8081/';

  addMovie(file: File, movieData: Movie): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('movieName', movieData.movieName);
    formData.append('description', movieData.description);
    formData.append('genre', movieData.genre);
    formData.append('director', movieData.director);
    formData.append('language', movieData.language);
    formData.append('year', movieData.year.toString());
    const req = new HttpRequest('POST', this.baseUrl + 'movies/addMovie', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  updateMovie(file: File, movieData: Movie): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('movieName', movieData.movieName);
    formData.append('description', movieData.description);
    formData.append('genre', movieData.genre);
    formData.append('director', movieData.director);
    formData.append('language', movieData.language);
    formData.append('year', movieData.year.toString());
    console.log(movieData.movieId);
    const req = new HttpRequest('PUT', this.baseUrl + 'movies/updateMovie/' + movieData.movieId, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + 'movies/findMovies').pipe(
      //tap(data => console.log(data)),
    );
  }
  
  getMovieById(id: number) {
    return this.http.get(this.baseUrl + 'movies/findMovies/' + id);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'movies/removeMovie/' + id);
  }

  getCountsByLanguage() {
    return this.http.get(this.baseUrl + 'movies/countByLanguage');
  }

  searchMovieByKeyword(key: String) {
    return this.http.get(this.baseUrl + 'movies/searchByKey/' + key);
  }

  getLatestPicks() {
    return this.http.get(this.baseUrl + 'movies/latestPicks');
  }

}
