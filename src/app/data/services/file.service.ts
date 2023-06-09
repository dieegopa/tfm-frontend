import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {map} from "rxjs";
import {File} from "../../shared/models/file.model";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {
  }

  getHeaders() {
    const cookieData = JSON.parse(this.cookies.get('authData'));
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + cookieData.token
    );
  }

  uploadFile(formData: FormData) {
    return this.http.post(
      environment.backendUrl + '/api/files/upload', formData,
      {headers: this.getHeaders(), observe: 'response'}
    );
  }

  updateFile(id: number | undefined, fileName: string, category: string, fileExta: string) {
    return this.http.put(
      environment.backendUrl + '/api/files/' + id, {
        fileName: fileName,
        category: category,
        fileExtra: fileExta
      },
      {headers: this.getHeaders(), observe: 'response'}
    );
  }

  getUserFiles(userSub: string | undefined) {
    return this.http.get<File []>(
      environment.backendUrl + '/api/files/user/' + userSub,
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getDifferentFiles(type: string | null, id: number | null) {
    return this.http.get<File []>(
      environment.backendUrl + '/api/files/' + type + '/' + id,
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getFile(id: string | undefined) {
    return this.http.get<any>(
      environment.backendUrl + '/api/files/' + id,
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getFiles() {
    return this.http.get<any []>(
      environment.backendUrl + '/api/files',
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteFile(id: number | undefined) {
    return this.http.delete(
      environment.backendUrl + '/api/files/' + id,
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
