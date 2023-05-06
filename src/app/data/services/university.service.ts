import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {University} from "../../shared/models/university.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private cookies: CookieService,
  ) {
  }

  getUniversities() {
    return this.http.get<University[]>(
      environment.backendUrl + '/universities',
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getFilteredUniversity(query: string) {
    return this.http.get<University[]>(
      environment.backendUrl + '/universities?search=' + query,
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map(response => {
        return response.body;
      })
    );

  }

  getHeaders() {
    const cookieData = JSON.parse(this.cookies.get('authData'));
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + cookieData.token
    );
  }
}
