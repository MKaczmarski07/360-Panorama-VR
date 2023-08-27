import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import { BasicComponent } from './home/basic/basic.component';
import { VrComponent } from './home/vr/vr.component';

const app = initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent, HomeComponent, BasicComponent, VrComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
