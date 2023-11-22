import { Component } from '@angular/core';
import {Observable} from "rxjs"
import { environment } from 'src/environments/environment';
import { SpinnerService } from './core/services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'authentication-with-node';
  isLoading$!: Observable<boolean>;
  constructor(private spinnerService: SpinnerService) {
    console.log(environment);
  }

  ngOnInit() {
    this.isLoading$ = this.spinnerService.isLoading()
  }


}
