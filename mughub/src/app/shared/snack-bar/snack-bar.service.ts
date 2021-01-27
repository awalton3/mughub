import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SnackBarService {

  onOpenSnackBar = new Subject<{ message: string, isError: boolean }>();
  onCloseSnackBar = new Subject();

  onSuccess(message: string) {
    this.onOpenSnackBar.next({ message: message, isError: false });
  }

  onError(message: string) {
    this.onOpenSnackBar.next({ message: message, isError: true });
  }

}
