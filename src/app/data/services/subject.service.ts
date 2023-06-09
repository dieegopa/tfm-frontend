import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {map} from "rxjs";
import {Subject} from "../../shared/models/subject.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
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

  getDegreeSubjects(degreeSlug: string | undefined) {
    return this.http.get<Subject>(
      environment.backendUrl + '/free/subjects/' + degreeSlug,
      {observe: 'response'}
    ).pipe(
      map(response => {
        return response.body;
      })
    );
  }

  setFavoriteSubject(subjectId: number | string, userSub: string) {
    return this.http.patch<{ favorite: boolean }>(
      environment.backendUrl + '/api/subjects/favorite',
      {
        subject_id: subjectId,
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
