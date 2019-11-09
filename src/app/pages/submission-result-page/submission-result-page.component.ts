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
        this.route.queryParams.subscribe((params) => {
            this.url = params.url || undefined;
        });
    }

}
