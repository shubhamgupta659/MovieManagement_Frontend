import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestService } from '../service/http-request.service';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  movie: Movie;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: HttpRequestService) { }

  ngOnInit() {
    let movieId = window.sessionStorage.getItem("editMovieId");
    if(!movieId) {
      alert("Invalid action.")
      this.router.navigate(['']);
      return;
    }
    this.editForm = this.formBuilder.group({
      movieId: [],
      movieName: ['', Validators.required],
      rating: ['', Validators.required],
      language: ['', Validators.required]
    });
    this.apiService.getMovieById(+movieId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .subscribe(
        data => {
            alert('Movie updated successfully.');
            this.router.navigate(['']);
        },
        error => {
          alert(error);
        });
  }

}
