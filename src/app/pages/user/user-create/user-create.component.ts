import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../../../services/user.service'; 
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { NbThemeService } from '@nebular/theme';
import { getDeepFromObject } from '../../../shared/helpers';
import { defaultUserOptions } from '../user.options';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  message: string;
  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean;
  user: User;

  constructor(private userService: UserService, 
    private router: Router,
    private themeService: NbThemeService ) { }

  ngOnInit() {
    this.user = new User();
  }

  getConfigValue(key: string) {
    return getDeepFromObject(defaultUserOptions, key, null);
  }

  // //用户信息
  // userInfo = {
  //   "name":"",
  //   "displayName":"",
  //   "password":"",
  //   "confirmPassword":"",
  //   "telephone":"",
  //   "email":"",
  //   "postNo":"",
  //   "address":"",
  //   "company":"",
  //   "industry":""
  // };

  //添加用户
  createUser(): void {
    this.errors.splice(0, this.errors.length);
    this.messages.splice(0, this.errors.length);
    
    this.userService.createUser(this.user)
      .subscribe(data => {
      console.log(data);
      this.messages.push("添加成功！")
      // return this.router.navigateByUrl("pages");
    },
    err => {
      if (err instanceof HttpErrorResponse) {
        this.errors.push("用户已经存在！")
      } 
    });
  }

}
