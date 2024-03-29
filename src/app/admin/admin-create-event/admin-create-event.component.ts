import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDatepickerConfig, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { config,Subscription, throwError } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-admin-create-event',
  templateUrl: './admin-create-event.component.html',
  styleUrls: ['./admin-create-event.component.css'],
  providers:[
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    NgbDatepickerConfig
  ]
})
export class AdminCreateEventComponent implements OnInit {
  public userId: string;
  public eventId: string;
  public startDate: Date;
  public endDate: Date;
  public title: string;
  public Location: string;
  public purpose: string;
  public startTime: any;
  public endTime: any;
  public color:any;
  public event;
  public adminName;
  public start;
  public end;
  public signuploader: any;
  public authToken: string;
  


  constructor(public socketService:SocketService,public toastr: ToastrService,public service:ServiceService,public router: Router,public _route:ActivatedRoute, private config:NgbDatepickerConfig) { 
    
    //configuring Datepicker
    const currentDate = new Date();

    config.minDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    config.maxDate = { year: currentDate.getFullYear(), month: 12, day: 31 };
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.userId=this._route.snapshot.paramMap.get('userId');
    this.adminName = Cookie.get('userName')
    this.authToken=Cookie.get('authToken');
     }
  
     //create event code start
      public createevent=()=>{
        this.start = new Date(this.startDate)
        let starting = this.startDate.getTime();
        let ending = this.endDate.getTime();
       if(!this.title){
          this.toastr.warning('Enter Title');
        }
        else if(!this.purpose){
          this.toastr.warning('Enter purpose');
        }
        else if(!this.Location){
          this.toastr.warning('Enter location');
        }
       
        else if(!this.startDate){
          this.toastr.warning('Choose startDate');
        }
        else if(!this.endDate){
          this.toastr.warning('choose endDate');
        }
        else if(!this.startTime){
          this.toastr.warning('choose startTime');
        }
        else if(!this.endTime){
          this.toastr.warning('choose endTime');
        } 
        
        else if(starting >= ending) {
          this.toastr.warning("The end date and time has to be in future than the start date and time");
        }
        else{
          this.signuploader=false;
         let data = {
            start:this.startDate,
            end:this.endDate,
            startHour:this.startTime.hour,
            startMinute:this.startTime.minute,
            endHour:this.endTime.hour,
            endMinute:this.endTime.minute,
            title:this.title,
            color:this.color,
            userId:this.userId,
            adminName:this.adminName,
            adminId:Cookie.get('userId'),
            location:this.Location,
            purpose:this.purpose,
            authToken:this.authToken
          };
       
          this.service.createevent(data).subscribe(
            data=>{
              this.signuploader=true;
              this.eventcreatedmail();
             this.toastr.success(data.message);
             let details={
              adminName:this.adminName,
              userId:this.userId,
              eventId:this.eventId
          }
    this.socketService.addcreatenotify(details);
             this.router.navigate(['/admindashboard',this.userId])
            },
            err=>{
              this.signuploader=true;
              this.toastr.error('some error occured');
            }
          )
      }
     //create event code end
    }


     //start send email notify
      public eventcreatedmail=()=>{
         let data={
           userId:this.userId,
           title:this.title,
           start:this.startDate,
           end:this.endDate
         }
         this.service.sendmailnotify(data).subscribe(
           data=>{
             
           },
           err=>{
             this.toastr.error('spme error occured');
           }
         )
      }
     //end send email notify

//logout code start
public logout=()=>{
  this.socketService.exitsocket();
  this.socketService.disconnectedSocket();
  Cookie.delete('authToken');
  Cookie.delete('userId');
  Cookie.delete('userName');
  this.toastr.success('logout successfully');
  setTimeout(() => {
    this.router.navigate(['/signin']);
  },1000);
}
 //logout code end
     
}
