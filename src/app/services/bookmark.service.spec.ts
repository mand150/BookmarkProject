import { TestBed } from '@angular/core/testing';

import { BookmarkService } from './bookmark.service';

describe('BookmarkServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: BookmarkService = TestBed.get(BookmarkService);
        expect(service).toBeTruthy();
    });
});
