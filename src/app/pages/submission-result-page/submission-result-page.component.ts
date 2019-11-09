import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-submission-result-page',
    templateUrl: './submission-result-page.component.html',
    styleUrls: ['./submission-result-page.component.css']
})
export class SubmissionResultPageComponent implements OnInit {

    url: string;

    constructor(private readonly route: ActivatedRoute) { }

    ngOnInit() {
        // get the url query param for display
        // unsubscribe not necessary https://angular.io/guide/router#observable-parammap-and-component-reuse
        this.route.queryParams.subscribe((params) => {
            this.url = params.url || undefined;
        });
    }

}
