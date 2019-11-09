import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { SubmissionResultPageComponent } from './pages/submission-result-page/submission-result-page.component';


const routes: Routes = [
    {
        path: 'result',
        component: SubmissionResultPageComponent
    }, {
        path: '',
        component: OverviewPageComponent
    },  { 
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
