import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { SubmissionResultPageComponent } from './pages/submission-result-page/submission-result-page.component';
import { BookmarkService } from './services/bookmark.service';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';

@NgModule({
    declarations: [
        AppComponent,
        OverviewPageComponent,
        SubmissionResultPageComponent,
        UrlFormComponent,
        BookmarkListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        BookmarkService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
