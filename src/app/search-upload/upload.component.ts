import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FilesDetail } from '../model/files-detail.model';
import { FileUploadService } from '../service/file-upload.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fileName', 'fileType','download','delete'];
  public dataSource : MatTableDataSource<FilesDetail>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos:any;

  constructor(private uploadService: FileUploadService,private notificationService: NotificationService,private router: Router) { }

  ngOnInit(): void {
      this.uploadService.getFiles().subscribe(data=>{
      this.fileInfos = data;
      this.dataSource = new MatTableDataSource<FilesDetail>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.uploadService.getFiles().subscribe(data=>{
                this.fileInfos = data;
                this.dataSource = new MatTableDataSource<FilesDetail>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              });
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

  public redirectToDelete = (row: any) => {
    this.uploadService.deleteFile(row.id)
    .subscribe( data => {
      this.fileInfos = this.fileInfos.filter(u => u.id !== row.id);
      this.dataSource = new MatTableDataSource<FilesDetail>(this.fileInfos);
      this.notificationService.success('File Deleted successfully');
      this.router.navigate(['/searchupload']);
    })
    
  }
}
