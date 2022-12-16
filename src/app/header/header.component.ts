import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private router:Router,
    public userService:UserService,
  ) {
  }

  ngOnInit(): void {
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logOut() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public permissions(role:string){
    if(role=='Admin'){
      return this.userService.roleMatch(['Admin']);
    }
    return this.userService.roleMatch(['User']);
  }


  public isAdmin(){
    return this.userAuthService.isAdmn();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }
}
