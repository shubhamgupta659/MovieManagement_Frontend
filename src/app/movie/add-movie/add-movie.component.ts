import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: MovieService) { }
  
  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      movieId: [],
      movieName: ['', Validators.required],
      rating: ['', Validators.required],
      language: ['', Validators.required]
    });
  }

  onSubmit() {
    this.apiService.addMovies(this.addForm.value).subscribe( data => {
        this.router.navigate(['']);
      });
  }

}
