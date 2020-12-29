import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public userMessage = false;
  constructor(public authService: AuthService,  public router: Router) { }

  ngOnInit(): void {
  }

  logIn(){
    this.userMessage = false;
    this.router.navigate(['sign-in'])
  }
  logOut(){
    this.userMessage = false;
    this.authService.SignOut();
  }
  goProfile(){
    this.userMessage = false;
    this.router.navigate(['profile'])
  }
}
