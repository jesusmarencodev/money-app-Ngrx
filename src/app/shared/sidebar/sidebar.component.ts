import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(  private readonly authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
      .then(res => {
        this.router.navigate(['/login']);
      })
      .catch(err=>{
        console.log(err)
      })
  }

}
