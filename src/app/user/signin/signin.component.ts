import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 public email: any;
 public password: any;
 public signuploader: boolean;

  constructor(public toastr: ToastrService,public service:ServiceService,public router: Router) { }

  ngOnInit() {
  }

   //signin code start
  public signin=()=>{
    if(!this.email){
         this.toastr.warning('Please Enter Email')
    }
    else if(!this.password){
      this.toastr.warning('Please Enter Password');
    }
    else {
  
      let data={
        email:this.email,
        password:this.password
      }
      this.signuploader=false;
      this.service.signinfunction(data).subscribe(
        data=>{
      
          if(data.error==false){
            this.signuploader=true;
            this.toastr.success(data.message);
            
            Cookie.set('authToken',data.data.authToken);

            Cookie.set('userId',data.data.userDetails.userId);

            Cookie.set('userName',data.data.userDetails.firstName + ' ' +data.data.userDetails.lastName);

            if(data.data.userDetails.isAdmin==true) {
              this.router.navigate(['/home']);
            }
            else if(data.data.userDetails.isAdmin==false){
              this.router.navigate(['/userdashboard',data.data.userDetails.userId]);
            }
          }
          else {
            this.signuploader=true;
            this.toastr.error(data.message);
          }
        },err=>{
         
          this.toastr.error('some error occured');
        }
      )
    }
  }
  //signin code end

}
