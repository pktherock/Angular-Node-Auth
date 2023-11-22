import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private loading = new BehaviorSubject<boolean>(false);

  constructor() {}

  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  showSpinner() {
    this.loading.next(true);
  }

  hideSpinner() {
    this.loading.next(false);
  }
}
