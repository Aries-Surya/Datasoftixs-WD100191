import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { ServicesComponent } from './services/services.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    AboutComponent,
    ResumeComponent,
    ServicesComponent,
    FooterComponent,
    NavComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule, 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
  