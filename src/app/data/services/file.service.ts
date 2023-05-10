import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";

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
}
