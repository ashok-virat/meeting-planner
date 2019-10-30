import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserEventComponent } from './user-event/user-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminUserDashboardComponent } from '../admin/admin-user-dashboard/admin-user-dashboard.component';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [UserDashboardComponent, UserEventComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot(),
    NgbModalModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild ([
     {path:'userdashboard/:userId',component:UserDashboardComponent},
     {path:'userdasheventview/:eventId',component:UserEventComponent}
    ])
  ]
})
export class UserDashModule { }
