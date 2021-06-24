import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: MovieService) { }

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      movieId: [],
      movieName: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      director: ['', Validators.required],
      language: ['', Validators.required],
      year: [, Validators.required]
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.apiService.addMovie(this.currentFile, this.addForm.value).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.router.navigate(['/viewMovie']);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }
      this.selectedFiles = undefined;
    }
  }

}
