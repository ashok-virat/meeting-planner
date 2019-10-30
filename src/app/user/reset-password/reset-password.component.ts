import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 public signuploader: boolean;
 public email: any;
 public Resetcode: any;
 public  password: any;
public signinloader: boolean;

  constructor(public toastr: ToastrService,public service:ServiceService,public router: Router,public _route:ActivatedRoute,private modal: NgbModal) { }

  ngOnInit() {
  }


  //send code is start
    public sendcode=()=>{
        if(!this.email){
          this.toastr.warning('Enter Your Email');
        }
        else {
          this.signuploader=false;
          this.service.sendresetcode(this.email).subscribe(
            data=>{
              this.signuploader=true;
              this.toastr.success(data.message);
            },
            err=>{
              this.signuploader=true;
                this.toastr.error('some error occured');
            }
          )
        }
    }
    //send code is end

    //resetpassword code start
   public resetpassword=()=>{
    if(!this.Resetcode){
      this.toastr.warning('Enter Your resetCode');
    }
    else if(!this.password){
      this.toastr.warning('Enter Your password');
    }
    else {
      this.signinloader=false;
      let data={
        password:this.password,
        resetId:this.Resetcode
      }
      this.service.resetpassword(data).subscribe(
        data=>{
          this.signinloader=true;
          this.toastr.success(data.message);
        },
        err=>{
          this.signinloader=true;
          this.toastr.error('some error occured');
        }
      )
    }
   }
    //resetpassword code end
}
