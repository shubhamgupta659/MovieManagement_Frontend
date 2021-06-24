import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../model/movie.model';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  movie: Movie;
  editForm: FormGroup;
  selectedMessage:any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: MovieService,private sharedDataService : SharedDataService) { }

  ngOnInit() {
    //let movieId = window.localStorage.getItem("editMovieId");
    // if(!movieId) {
    //   alert("Invalid action.")
    //   this.router.navigate(['']);
    //   return;
    // }
    this.editForm = this.formBuilder.group({
      movieId: [],
      movieName: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      director: ['', Validators.required],
      language: ['', Validators.required],
      year: [, Validators.required],
      createdBy: '',
      createdDateTime:'',
      dbFiles:[],
    });
    this.sharedDataService.currentMessage.subscribe(message => (this.selectedMessage= message));
    this.apiService.getMovieById(+this.selectedMessage)
      .subscribe( data => {
        console.log(data);
        this.editForm.setValue(data);
      });
  }

  // onSubmit() {
  //   this.apiService.updateUser(this.editForm.value)
  //     .subscribe(
  //       data => {
  //           alert('Movie updated successfully.');
  //           this.router.navigate(['/viewMovie']);
  //       });
  // }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(){
    console.log(this.editForm.value.year);
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.apiService.updateMovie(this.currentFile,this.editForm.value).subscribe(
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
