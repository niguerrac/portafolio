import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { FormsModule } from '@angular/forms';
import { VideosComponent } from './videos/videos.component';
import { YouTubePlayerModule } from "@angular/youtube-player";

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
