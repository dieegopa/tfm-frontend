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
}
