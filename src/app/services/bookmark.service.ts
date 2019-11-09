import { Injectable } from '@angular/core';

const bookmarkKey = 'bookmarks';
const URL_ALREADY_BOOKMARKED = 'The URL has already been bookmarked';

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {

    constructor() { }

    getBookmarks(): string[] {
        return JSON.parse(localStorage.getItem(bookmarkKey));
    }

    clearBookmarks() {
        localStorage.removeItem(bookmarkKey);
    }

    setBookmarks(bookmarks: string[]) {      
        localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks));
    }
    
    addBookmark(bookmark: string) {
        let bookmarks = this.getBookmarks() || [];
        if (this.checkIfAlreadyBookmarked(bookmark, bookmarks)) {
            throw new Error(URL_ALREADY_BOOKMARKED);
        }
        bookmarks.unshift(bookmark);
        this.setBookmarks(bookmarks);
    }

    removeBookmark(bookmark: string): string[] {
        let bookmarks = this.getBookmarks();
        const index = bookmarks.findIndex((element) => {
            return element === bookmark;
        });
        if (index > -1) {
            bookmarks.splice(index, 1);
            this.setBookmarks(bookmarks);
        }
        return bookmarks;
    }

    editBookmark(oldBookmark, newBookmark) {
        let bookmarks = this.getBookmarks();
        if (this.checkIfAlreadyBookmarked(newBookmark, bookmarks)) {
            throw new Error(URL_ALREADY_BOOKMARKED);
        }
        const oldIndex = bookmarks.findIndex((element) => element === oldBookmark);
        if (oldIndex > -1) {
            bookmarks.splice(oldIndex, 1, newBookmark);
            this.setBookmarks(bookmarks);
        }
        return bookmarks;
    }

    checkIfAlreadyBookmarked(bookmark, bookmarks) {
        const index = bookmarks.findIndex((element) => element === bookmark);
        return index > -1;
    }
}
