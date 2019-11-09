import { Injectable } from '@angular/core';

const bookmarkKey = 'bookmarks';
const URL_ALREADY_BOOKMARKED = 'The URL has already been bookmarked';

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {

    constructor() { }

    // return the parsed array of bookmarks from locale storage
    getBookmarks(): string[] {
        return JSON.parse(localStorage.getItem(bookmarkKey));
    }

    // clear the bookmarks saved in locale storage
    clearBookmarks() {
        localStorage.removeItem(bookmarkKey);
    }

    // JSON stringify the array of urls and store in local storage
    setBookmarks(bookmarks: string[]) {      
        localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks));
    }

    // get the already stored bookmarks from local storage,
    // check if the bookmark to be added is already present within the array and throw error if it is
    // then add the new bookmark to the array and store in local storage    
    addBookmark(bookmark: string) {
        let bookmarks = this.getBookmarks() || [];
        if (this.checkIfAlreadyBookmarked(bookmark, bookmarks)) {
            throw new Error(URL_ALREADY_BOOKMARKED);
        }
        bookmarks.unshift(bookmark);
        this.setBookmarks(bookmarks);
    }

    // find the index of the bookmark to be removed within the array of bookmarks
    // remove it, store the new array of bookmakrs in local storage and return it
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

    // check that the replacement is not already present within the array 
    // and replace the item at the bookmark's index with the new bookmark and store in local storage
    // return the new array of bookmarks
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

    // given a bookmark and array of bookmarks, check if the bookmark is present within the array
    checkIfAlreadyBookmarked(bookmark, bookmarks) {
        const index = bookmarks.findIndex((element) => element === bookmark);
        return index > -1;
    }
}
