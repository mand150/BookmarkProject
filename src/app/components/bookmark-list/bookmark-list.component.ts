import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../../../src/app/services/bookmark.service';
import { ActivatedRoute, Router } from '@angular/router';

const pageSize = 20;

@Component({
    selector: 'app-bookmark-list',
    templateUrl: './bookmark-list.component.html',
    styleUrls: ['./bookmark-list.component.css']
})
export class BookmarkListComponent implements OnInit {

    bookmarks: string[];

    currentPage = 0;
    currentPageBookmarksObject: any[];
    pages: number[];

    constructor(private readonly bookmarkService: BookmarkService,
        private readonly route: ActivatedRoute,
        private readonly router: Router) { }

    ngOnInit() {
        this.getBookmarks();
        const bookmarkLength = this.bookmarks ? this.bookmarks.length : 0;
        if (bookmarkLength > 0) {
            // Create a simple array with a length that matches the number of pages
            const numberOfPages = Math.ceil(bookmarkLength / pageSize);
            this.pages = [...Array(numberOfPages).keys()]

            // check if page number provided as query param and apply
            // unsubscribe not necessary https://angular.io/guide/router#observable-parammap-and-component-reuse
            this.route.queryParams.subscribe((queryParms) => {
                 if (queryParms.page && queryParms.page <= numberOfPages) {
                    this.currentPage = queryParms.page - 1;
                }
               this.setCurrentPageBookmarks();
            });
        }

    }

    setCurrentPage(i) {
        this.router.navigate([], { relativeTo: this.route, queryParams: { page: i + 1}});
    }

    // Based on the current page and page size, set the bookmarks for the relevant page
    setCurrentPageBookmarks() {
        const starterIndex = this.currentPage * pageSize;
        const currentPageBookmarks = this.bookmarks.slice(starterIndex, starterIndex + pageSize)
        this.currentPageBookmarksObject = currentPageBookmarks.map((bookmark) => ({url: bookmark, isEditing: false}));
    }

    // Get the bookmarks using the bookmark service
    getBookmarks() {
        this.bookmarks = this.bookmarkService.getBookmarks();
    }

    // When a user clicks a delete button, delete the bookmark using the bookmark service 
    // and then change the set of bookmarks to be displayed
    deleteBookmark(bookmark) {
        this.bookmarks = this.bookmarkService.removeBookmark(bookmark);
        this.setCurrentPageBookmarks();
    }

}
