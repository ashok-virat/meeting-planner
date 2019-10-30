import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUserDashboardComponent } from './admin-user-dashboard/admin-user-dashboard.component';
import { AdminCreateEventComponent } from './admin-create-event/admin-create-event.component';
import { AdminEditEventComponent } from './admin-edit-event/admin-edit-event.component';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [AdminHomeComponent, AdminUserDashboardComponent, AdminCreateEventComponent, AdminEditEventComponent],
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
     {path:'home',component:AdminHomeComponent},
     {path:'admindashboard/:userId',component:AdminUserDashboardComponent},
     {path:'createevent/:userId',component:AdminCreateEventComponent},
     {path:'editevent/:eventId',component:AdminEditEventComponent}
    ])
  ]
})
export class AdminModule { }
