import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 public baseurl: string;
  public authToken: any;

  constructor(public http:HttpClient) {
    this.baseurl='http://localhost:4001/api/v1/users';
    this.authToken=Cookie.get('authToken');
   }

     //signup code start
     public signupfunction=(data):any=>{
      let params=new HttpParams()
      .set("firstName",data.firstName)
      .set("lastName",data.lastName)
      .set("email",data.email)
      .set("password",data.password)
      .set("mobileNumber",data.mobileNumber)
      .set("CountryCode",data.countryCode)
      .set('isAdmin',data.isAdmin)
      .set('userName',data.userName)
      let datas=this.http.post(`${this.baseurl}/signup`,params);
      return datas;
    }
    //signup code end

    //signin code start
    public signinfunction=(data):any=>{
      let params=new HttpParams()
      .set('email',data.email)
      .set('password',data.password)
      let datas=this.http.post(`${this.baseurl}/signin`,params);
      return datas;
        }
      //signin code start


      //get all Users code start
      public getallusers=(authToken):any=>{
        let datas=this.http.get(`${this.baseurl}/allUsers/${authToken}`);
      return datas;
      }
      //get all Users code end

      //create event code is start
        public createevent=(data):any=>{
          let params = new HttpParams()
          .set('title',data.title)
          .set('start',data.start)
          .set('startHour',data.startHour)
          .set('startMinute',data.startMinute)
          .set('end',data.end)
          .set('endHour',data.endHour)
          .set('endMinute',data.endMinute)
          .set('creatorId',data.creatorId)
          .set('creatorName',data.creatorName)
          .set('userId',data.userId)
          .set('color',data.color)
          .set('adminId',data.adminId)
          .set('adminName',data.adminName)
          .set('purpose',data.purpose)
          .set('location',data.location)
          .set('authToken',data.authToken)

        let datas=this.http.post(`${this.baseurl}/createevent`,params);
        return datas;
        }
      //create event code is end


      //get allevents code start
      public getallevents=(userId,authToken):any=>{
        let params=new HttpParams()
        .set('userId',userId)
        .set('authToken',authToken)
        let datas=this.http.post(`${this.baseurl}/getallevents/`,params);
          return datas;
      }
      //get allevents code end


      //get singleevent code start
      public getsingleevents=(eventId,authToken):any=>{
        console.log(this.authToken)
            let params=new HttpParams()
            .set('eventId',eventId)
            .set('authToken',authToken)
            let datas=this.http.post(`${this.baseurl}/getsingleevent`,params);
              return datas;
      }
     //get singleevent code end


     //edit event code start
      public editevent=(data,authToken):any=>{
        let params = new HttpParams()
        .set('title',data.title)
        .set('start',data.start)
        .set('startHour',data.startHour)
        .set('startMinute',data.startMinute)
        .set('end',data.end)
        .set('endHour',data.endHour)
        .set('endMinute',data.endMinute)
        .set('creatorId',data.creatorId)
        .set('creatorName',data.creatorName)
        .set('userId',data.userId)
        .set('color',data.color)
        .set('adminId',data.adminId)
        .set('adminName',data.adminName)
        .set('purpose',data.purpose)
        .set('location',data.location)
        .set('eventId',data.eventId)
        .set('authToken',authToken)
        let datas=this.http.post(`${this.baseurl}/editevent`,params);
        return datas;
      }
     //edit event code end


     //delete event code start
       public deleteevent=(eventId,authToken):any=>{
         let params=new HttpParams()
         .set('eventId',eventId)
         .set('authToken',authToken)
         let datas=this.http.post(`${this.baseurl}/deleteevent`,params);
         return datas;
       }
     //delete event code end

     
     //sendcode start
     public sendresetcode=(email):any=>{
       let params=new HttpParams()
       .set('email',email)
       let datas=this.http.post(`${this.baseurl}/resetcode`,params);
         return datas;
     }
     //sendcode end


     //resetpassword code start
    public resetpassword=(data):any=>{
      let params=new HttpParams()
      .set('password',data.password)
      .set('resetId',data.resetId)
      let datas=this.http.post(`${this.baseurl}/resetpassword`,params);
      return datas;
    }
     //resetpassword code end


     //send create event mail notify code start
     public sendmailnotify=(data):any=>{
       let params=new HttpParams()
       .set('userId',data.userId)
      .set('title',data.title)
      .set('start',data.start)
      .set('end',data.end)
      let datas=this.http.post(`${this.baseurl}/sendcreatedmail`,params);
      return datas;
     }
     //end create event mail notify code end

     
     //send edit event mail notify code start
     public sendeditmailnotify=(data):any=>{
       console.log(data)
      let params=new HttpParams()
      .set('userId',data.userId)
     .set('title',data.title)
     .set('adminName',data.adminName)
     let datas=this.http.post(`${this.baseurl}/sendeditmail`,params);
     return datas;
    }
    //end edit event mail notify code end


     
     //send delete event mail notify code start
     public senddeletemailnotify=(data):any=>{
     let params=new HttpParams()
     .set('userId',data.userId)
    .set('title',data.title)
    .set('adminName',data.adminName)
    let datas=this.http.post(`${this.baseurl}/sendedeletemail`,params);
    return datas;
   }
   //end delete event mail notify code end
}
