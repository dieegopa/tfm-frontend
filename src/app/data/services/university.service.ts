import {Injectable} from "@angular/core";
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

  getUniversities() {
    return this.http.get<University[]>(
      environment.backendUrl + '/free/universities',
      {observe: 'response'}
    ).pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getFilteredUniversity(query: string) {
    return this.http.get<University[]>(
      environment.backendUrl + '/free/universities?search=' + query,
      {observe: 'response'}
    ).pipe(
      map(response => {
        return response.body;
      })
    );

  }

  getUniversityDegrees(universitySlug: string) {
    return this.http.get<University>(
      environment.backendUrl + '/free/universities/' + universitySlug,
      {observe: 'response'}
    ).pipe(
      map(response => {
        return response.body;
      })
    );
  }
}
