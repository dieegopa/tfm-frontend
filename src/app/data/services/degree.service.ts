import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {map} from "rxjs";
import {Degree} from "../../shared/models/degree.model";

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {
  }

  getUniversityDegree(universitySlug: string | undefined, degreeSlug: string | undefined) {
    return this.http.get<Degree[]>(
      environment.backendUrl + '/degrees/' + universitySlug + '/' + degreeSlug,
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
