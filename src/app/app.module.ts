import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, NotfoundpageComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
