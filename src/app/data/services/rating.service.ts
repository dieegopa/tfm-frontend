import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingService {
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

  setRating(fileId: string | undefined, userSub: string | undefined, value: number) {
    return this.http.post(
      environment.backendUrl + '/api/ratings',
      JSON.stringify({file_id: fileId, user_sub: userSub, value: value}),
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getFileUserRating(fileId: string | undefined, userSub: string) {
    return this.http.get(
      environment.backendUrl + '/api/ratings/' + fileId + '/' + userSub,
      {headers: this.getHeaders(), observe: 'response'}
    ).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
