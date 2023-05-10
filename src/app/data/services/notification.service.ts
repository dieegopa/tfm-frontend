import {Injectable} from "@angular/core";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import {HotToastService} from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private toastService: HotToastService,
  ) {
  }

  showSuccesNotification(message: string) {
    this.toastService.success(message, {
      style: {
        border: '1px solid #0D9488',
        padding: '16px',
        color: '#0D9488',
      },
      iconTheme: {
        primary: '#0D9488',
        secondary: '#ffffff',
      },
    });
  }


  showErrorNotification(message: string) {
    this.toastService.error(message, {
      style: {
        border: '1px solid #B91C1B',
        padding: '16px',
        color: '#B91C1B',
      },
      iconTheme: {
        primary: '#B91C1B',
        secondary: '#ffffff',
      },
    });
  }

}
