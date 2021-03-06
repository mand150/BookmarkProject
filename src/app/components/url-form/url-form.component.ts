import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { BookmarkService } from '../../../../src/app/services/bookmark.service';


@Component({
    selector: 'app-url-form',
    templateUrl: './url-form.component.html',
    styleUrls: ['./url-form.component.css']
})
export class UrlFormComponent implements OnInit {

    @Input('url') url: string;
    error: string;

    urlInput = new FormControl(undefined, [
        Validators.required,
        Validators.pattern('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$')
    ], [
        this.urlExistsValidator.bind(this)
    ]);

    constructor(private readonly router: Router,
        private readonly bookmarkService: BookmarkService) { }

    urlExistsValidator(control: AbstractControl) {
        let url = control.value;
        // If the pattern is invalid, do not check if the url exists
        const urlPatternValid = !control.hasError('patern');
        if (url && urlPatternValid) {
            return fetch(url, {mode: "no-cors"})
                .then((response) => null) // Exists
                .catch((error) => ({doesNotExist: true}))              
        } else {
            return of(null);
        }

    }

    onSubmit() {
        const url = this.urlInput.value;
        try {
            // If there was a url as input then replace that url within the bookmarks, if not create a new one
            if (this.url) {
                this.bookmarkService.editBookmark(this.url, url);
            } else {
                this.bookmarkService.addBookmark(url);
            }
            // Navigate to submission result page
            this.router.navigate(['result'], { queryParams: { url: url } });
        } catch (error) {
            // Display the error
            this.error = error;
        }

    }

    ngOnInit() {
        // If a url input is present set the form control value to the url input value
        if (this.url) {
            this.urlInput.setValue(this.url);
        }
    }

}
