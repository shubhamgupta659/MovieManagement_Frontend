import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8081/';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'file/uploadFile', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.baseUrl+'file/fileDetails');
  }

  deleteFile(id: number) {
    return this.http.delete(this.baseUrl + 'file/removeFile/' + id );
  }

  downloadFile(id: number):Observable<any> {
    return this.http.get(this.baseUrl + 'file/downloadFile/' + id, {responseType: 'blob'} );
  }
}
