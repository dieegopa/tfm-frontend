import {Injectable} from "@angular/core";
import {Auth} from "@angular/fire/auth";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  headers = new HttpHeaders().set(
    'Authorization', 'Bearer ' + this.cookies.get('token')
  );

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {
  }

  accessDashboard() {
    return this.http.get(
      environment.backendUrl + '/dashboard', {headers: this.headers}
    );
  }
}
