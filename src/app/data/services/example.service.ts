import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {
  }

  accessDashboard() {

    const cookieData = JSON.parse(this.cookies.get('authData'));
    let headers = new HttpHeaders().set(
      'Authorization', 'Bearer ' + cookieData.token
    );

    return this.http.get(
      environment.backendUrl + '/dashboard', {headers: headers}
    );
  }
}
