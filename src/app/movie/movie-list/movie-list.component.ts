import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import {Movie} from "../../model/movie.model";
import { SharedDataService } from 'src/app/service/shared-data.service';
import { TabsDetail } from 'src/app/model/tabs.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: any;
  public tabs = [
    {name: 'HINDI', count : 0, color:'rgb(224,57,6)', icon:'developer_mode'}
  ];
  public newtab =new Array();

  constructor(private router: Router, private apiService: MovieService, private sharedDataService : SharedDataService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getCountsByLanguage().subscribe(
      list => {
      this.setTabData(list);
      });
    this.apiService.getMovies()
      .subscribe( data => {
          this.movies = data;
      });
  }

  public setTabData(list:any){
    for(var i = 0; i < list.length; i++){
      const tab = {'name': list[i][0], 'count':list[i][1],'color':'rgb(224,57,6)','icon':'developer_mode'};
      this.newtab.push(tab);
    }
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
