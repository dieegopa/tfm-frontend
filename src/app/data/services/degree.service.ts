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

  getHeaders() {
    const cookieData = JSON.parse(this.cookies.get('authData'));
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + cookieData.token
    );
  }

  getUniversityDegree(universitySlug: string | undefined, degreeSlug: string | undefined) {
    return this.http.get<Degree[]>(
      environment.backendUrl + '/free/degrees/' + universitySlug + '/' + degreeSlug,
      {observe: 'response'}
    ).pipe(
      map(response => {
        return response.body;
      })
    );
  }

  setFavoriteDegree(degreeId: number | string, userSub: string) {
    return this.http.post<{ favorite: boolean }>(
      environment.backendUrl + '/api/degrees/favorite',
      {
        degree_id: degreeId,
        user_sub: userSub,
      },
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map(response => {
          return response.body;
        }
      )
    );
  }
}
