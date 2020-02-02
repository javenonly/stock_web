import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from '../../../models/user';
import {UserService} from '../../../services/user.service'; 
// import { SmartTableService } from '../../../@core/mock/smart-table.service';
// import { SmartTableData } from '../../../@core/data/smart-table';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NbThemeService } from '@nebular/theme';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'user-list',
  // providers: [ SmartTableData ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  user: User;
  errors: string[] = [];
  messages: string[] = [];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      confirmCreate: true,
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      confirmSave: true,
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'number',
      // },
      name: {
        title: '登陆名',
        type: 'string',
      },
      displayName: {
        title: '姓名（昵称）',
        type: 'string',
      },
      telephone: {
        title: '电话',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      postNo: {
        title: '邮编',
        type: 'string',
      },
      address: {
        title: '地址',
        type: 'string',
      },
      company: {
        title: '公司',
        type: 'string',
      },
      industry: {
        title: '行业',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private userService: UserService, 
    private router: Router,
    private themeService: NbThemeService,
    private alertService: AlertService ) { }



  //用户检索
  searchUser(conditions): void {
    this.userService.searchUser(conditions).subscribe(data => {
      var user_view = [];
      var user_data = data["listUserModel"];
      var all_length = user_data.length;
      for (var i = 0; i < all_length; i++) {
          var user_obj = {id:"",name:"",displayName:"",
          telephone:"",email:"",postNo:"",address:"",company:"",industry:""};
          user_obj.id = user_data[i].id;
          user_obj.name = user_data[i].name;
          user_obj.displayName = user_data[i].displayName;
          user_obj.telephone = user_data[i].telephone;
          user_obj.email = user_data[i].email;
          user_obj.postNo = user_data[i].postNo;
          user_obj.address = user_data[i].address;
          user_obj.company = user_data[i].company;
          user_obj.industry = user_data[i].industry;
          user_view.push(user_obj);
        }
      this.source.load(user_view);
    } );
  }

  onCreateConfirm(event): void {
    console.log('create****************',event.newData)
    const params = {
      // id : event.data.id,
      name : event.newData.name,
      password : '8888888',
      displayName : event.newData.displayName,
      telephone : event.newData.telephone,
      email : event.newData.email,
      postNo : event.newData.postNo,
      address : event.newData.address,
      company : event.newData.company,
      industry : event.newData.industry
    };
    this.userService.createUserList(params)
      .subscribe(user => {
      this.messages.push("登录成功！")
      // this.alertService.success("更新成功！", true);
    },
    err => {
      if (err instanceof HttpErrorResponse) {
        this.errors.push("用户已经存在！")
      } 
    });
    event.confirm.resolve();
  }

  onEditConfirm(event): void {
    if (window.confirm('确定要更新吗?')) {
      // console.log('edit****************',event.newData)
      const params = {
        id : event.data.id,
        name : event.newData.name,
        displayName : event.newData.displayName,
        telephone : event.newData.telephone,
        email : event.newData.email,
        postNo : event.data.postNo,
        address : event.data.address,
        company : event.newData.company,
        industry : event.newData.industry
      };
      this.userService.updateUser(params)
        .subscribe(user => {
        // this.messages.push("登录成功！")
        this.alertService.success("更新成功！", true);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          this.errors.push("更新失败！")
        } 
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('确定要删除吗?')) {
      // console.log('del****************',event.data)
      this.alertService.clear();
      this.errors.splice(0, this.errors.length);
      this.messages.splice(0, this.errors.length);
      this.userService.deleteUser(event.data.id)
        .subscribe(user => {
        // this.messages.push("登录成功！")
        this.alertService.success("删除成功！", true);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          this.errors.push("删除失败！")
        } 
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.user = new User();
    this.user.name = "";
    this.searchUser(this.user);
  }

}
