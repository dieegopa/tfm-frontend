import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {map} from "rxjs";
import {Course} from "../../shared/models/course.model";
import {Subject} from "../../shared/models/subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {
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


  getHeaders() {
    const cookieData = JSON.parse(this.cookies.get('authData'));
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + cookieData.token
    );
  }
}
