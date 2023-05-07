import {Injectable} from "@angular/core";
import {Notify} from "notiflix/build/notiflix-notify-aio";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {
  }

  showSuccesNotification(message: string) {
    Notify.success(message, {
      position: 'center-top',
      distance: '4px',
      success: {
        background: '#0D9488',
        notiflixIconColor: '#ffffff',
      },
    });
  }


  showErrorNotification(message: string) {
    Notify.failure(message, {
      position: 'center-top',
      distance: '4px',
      failure: {
        background: '#B91C1B',
        notiflixIconColor: '#ffffff',
      },
    });
  }

}
