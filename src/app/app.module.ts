import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { AdminModule } from './admin/admin.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserDashModule } from './user-dash/user-dash.module';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    NgxPaginationModule,
    UserDashModule,
    ToastrModule.forRoot({
      preventDuplicates:true
    }),
    UserModule,
    AdminModule,
    RouterModule.forRoot([
      {path:'signin',component:SigninComponent,pathMatch:'full'},
      {path:'',redirectTo:'signin',pathMatch:'full'},
      {path:"*",component:SigninComponent},
      {path:"**",component:SigninComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
