import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {map} from "rxjs";
import {Course} from "../../shared/models/course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {
  }

  getDegreeCourses(degreeSlug: string | undefined) {
    return this.http.get<Course[]>(
      environment.backendUrl + '/free/courses/' + degreeSlug,
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
