import { Component, OnInit } from '@angular/core';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { ActivatedRoute } from '@angular/router';

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
        private readonly router: ActivatedRoute) { }

    ngOnInit() {
        this.getBookmarks();
        const bookmarkLength = this.bookmarks ? this.bookmarks.length : 0;
        if (bookmarkLength > 0) {
            this.pages = [...Array(Math.ceil(bookmarkLength / 20)).keys()]
            this.router.queryParams.subscribe((queryParms) => {
                if (queryParms.page) {
                    this.currentPage = queryParms.page;
                }
               this.setCurrentPageBookmarks();
            });
        }

    }

    setCurrentPage(i) {
        this.currentPage = i;
    }

    setCurrentPageBookmarks() {
        const starterIndex = this.currentPage * 20;
        const currentPageBookmarks = this.bookmarks.slice(starterIndex, starterIndex + pageSize)
        this.currentPageBookmarksObject = currentPageBookmarks.map((bookmark) => ({url: bookmark, isEditing: false}));
    }

    getBookmarks() {
        this.bookmarks = this.bookmarkService.getBookmarks();
    }

    onPageChange(i) {
        this.setCurrentPage(i);
        this.setCurrentPageBookmarks();
    }

    deleteBookmark(bookmark) {
        this.bookmarks = this.bookmarkService.removeBookmark(bookmark);
        this.setCurrentPageBookmarks();
    }

}
