import { Component, OnInit } from '@angular/core';
import { DialogService,BuiltInOptions } from 'ngx-bootstrap-modal';
import { LocalDataSource } from 'ng2-smart-table';
import {RoleService} from '../../services/role.service'; 
// import { HttpErrorResponse } from '@angular/common/http';
import { NbThemeService } from '@nebular/theme';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

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
      roleCd: {
        title: '角色代码',
        type: 'string',
      },
      roleName: {
        title: '角色名',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private roleService: RoleService, 
    private router: Router,
    private themeService: NbThemeService,
    private alertService: AlertService,
    public dialogService: DialogService ) { }

  //角色检索
  queryAllRoles(): void {
    this.roleService.queryAllRoles().subscribe(data => {
      var role_view = [];
      var user_data = data["listRole"];
      var all_length = user_data.length;
      for (var i = 0; i < all_length; i++) {
          var role_obj = {id:"",roleCd:"",roleName:""};
          role_obj.id = user_data[i].id;
          role_obj.roleCd = user_data[i].roleCd;
          role_obj.roleName = user_data[i].roleName;
          role_view.push(role_obj);
        }
      this.source.load(role_view);
    } );
  }

  onCreateConfirm(event): void {
    this.dialogService.show(<BuiltInOptions>{
      content:"保存成功！",
      icon:'success',
      size: 'sm',
      showCancelButton:false})
    // // console.log('create****************',event.newData)
    // const params = {
    //   // id : event.data.id,
    //   role_cd : event.newData.roleCd,
    //   role_name : event.newData.roleName,
    // };
    // this.roleService.createRole(params)
    //   .subscribe(data => {
    //   this.messages.push("登录成功！")
    //   // this.alertService.success("更新成功！", true);
    // },
    // err => {
    //   if (err instanceof HttpErrorResponse) {
    //     this.errors.push("角色已经存在！")
    //   } 
    // });
    // event.confirm.resolve();
  }

  onEditConfirm(event): void {
    if (window.confirm('确定要更新吗?')) {
      // console.log('edit****************',event.newData)
      const params = {
        id : event.data.id,
        role_cd : event.newData.roleCd,
        role_name : event.newData.roleName
      };
      this.roleService.updateRole(params)
        .subscribe(data => {
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
      this.roleService.deleteRole(event.data.id)
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
    this.queryAllRoles();
  }

}
