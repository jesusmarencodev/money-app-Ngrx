import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'money-app-ngrx';

  constructor(private readonly authService: AuthService,){
    this.authService.initAuthListener();
  }
}
