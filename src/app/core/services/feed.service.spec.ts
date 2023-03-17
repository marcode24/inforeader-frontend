import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { getFeedMock, getFeedsMock } from '@mocks/feed.mock';
import { getUserMock } from '@mocks/user.mock';
import { environment } from 'environments/environment';

import { Feed } from '@models/feed.model';
import { User } from '@models/user.model';

import { AuthService } from './auth.service';
import { FeedService } from "./feed.service";

const { base_url } = environment;

describe('Feed Service', () => {
  let feedService: FeedService;
  let httpController: HttpTestingController;
  let spyAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spyAuth = jasmine.createSpyObj(
      'AuthService',
      ['getUserActive'],
      { userActive: { email: 'example@test.com', savedFeeds: ['1234'] }
    });
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        FeedService,
        {
          provide: AuthService,
          useValue: spyAuth,
        },
      ],
    });

    feedService = TestBed.inject(FeedService);
    httpController = TestBed.inject(HttpTestingController);
    spyAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(feedService).toBeTruthy();
  });

  describe('get feeds function', () => {
    it('should return feeds when user is not authenticated', (doneFn) => {
      const mockFeeds: Feed[] = getFeedsMock();
      const options = { skip: 0, limit: 10 };

      feedService.getFeeds(options.skip, options.limit).subscribe((feeds) => {
        expect(feeds).toEqual(mockFeeds);
        expect(feeds.length).toBe(mockFeeds.length);
        doneFn();
      });

      const url = `${base_url}/feed?skip=${options.skip}&limit=${options.limit}`;
      const req = httpController.expectOne(url);
      req.flush({ ok: true, feeds: mockFeeds });

      expect(req.request.method).toBe('GET');
      expect(req.request.headers.has('x-token')).toBe(false);
    });

    it('should return feeds when user is authenticated', (doneFn) => {
      const mockFeeds: Feed[] = getFeedsMock();
      const options = { skip: 0, limit: 10 };

      feedService.getFeeds(options.skip, options.limit, true).subscribe((feeds) => {
        expect(feeds).toEqual(mockFeeds);
        expect(feeds.length).toBe(mockFeeds.length);
        doneFn();
      });

      const url = base_url + '/feed/byUser/subscription?skip=' + options.skip
        + '&limit=' + options.limit;
      const req = httpController.expectOne(url);
      req.flush({ ok: true, feeds: mockFeeds });

      expect(req.request.method).toBe('GET');
    });

    it('should return by default 10 feeds from offset 0', (doneFn) => {
      const options = { skip: 0, limit: 10 };
      const mockFeeds: Feed[] = getFeedsMock(options.limit);

      feedService.getFeeds().subscribe((feeds) => {
        expect(feeds).toEqual(mockFeeds);
        expect(feeds.length).toBe(mockFeeds.length);
        doneFn();
      });

      const url = `${base_url}/feed?skip=${options.skip}&limit=${options.limit}`;
      const req = httpController.expectOne(url);
      req.flush({ ok: true, feeds: mockFeeds });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('get feed by id function', () => {
    it('should return feed by id = 1234', (doneFn) => {
      const mockFeed: Feed = getFeedMock();
      mockFeed._id = '1234';

      feedService.getFeed(mockFeed._id).subscribe((feed) => {
        expect(feed).toEqual(mockFeed);
        expect(feed._id).toBe(mockFeed._id);
        doneFn();
      });

      const url = `${base_url}/feed/${mockFeed._id}`;
      const req = httpController.expectOne(url);
      req.flush({ ok: true, feed: mockFeed });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('saved feeds function', () => {
    it('should return saved feeds', (doneFn) => {
      const mockFeeds: Feed[] = getFeedsMock();
      const options = { skip: 0, limit: 10 };

      feedService.getSavedFeeds().subscribe((feeds) => {
        expect(feeds).toEqual(mockFeeds);
        expect(feeds.length).toBe(mockFeeds.length);
        doneFn();
      });

      const url = base_url + '/feed/byUser/saved' + '?skip='
         + options.skip + '&limit=' + options.limit;
      const req = httpController.expectOne(url);
      req.flush({ ok: true, feeds: mockFeeds });

      expect(req.request.method).toBe('GET');
    });

    it('should return saved feeds by default 10 feeds from offset 0', (doneFn) => {
      const options = { skip: 0, limit: 10 };
      const mockFeeds: Feed[] = getFeedsMock(options.limit);

      feedService.getSavedFeeds().subscribe((feeds) => {
        expect(feeds).toEqual(mockFeeds);
        expect(feeds.length).toBe(mockFeeds.length);
        doneFn();
      });

      const url = base_url + '/feed/byUser/saved' + '?skip='
         + options.skip + '&limit=' + options.limit;
      const req = httpController.expectOne(url);
      req.flush({ ok: true, feeds: mockFeeds });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('search feeds function', () => {
    it('should return feeds by search = "test"', (doneFn) => {
      const options = { skip: 0, limit: 10 };
      const mockFeeds: Feed[] = getFeedsMock(options.limit);
      const search = 'test';

      feedService.searchFeeds(options.skip, options.limit, search).subscribe((feeds) => {
        expect(feeds).toEqual(mockFeeds);
        expect(feeds.length).toBe(mockFeeds.length);
        doneFn();
      });

      const url = base_url + '/feed/search' + '?skip=' + options.skip + '&limit='
         + options.limit + '&q=' + search;
      const req = httpController.expectOne(url);
      req.flush({ ok: true, feeds: mockFeeds });

      expect(req.request.method).toBe('GET');
    });

    it('should return feeds by search = "test" by default '
      +'10 feeds from offset 0', (doneFn) => {
      const options = { skip: 0, limit: 10 };
      const mockFeeds: Feed[] = getFeedsMock(options.limit);
      const search = 'test';

      feedService.searchFeeds(undefined, undefined, search).subscribe((feeds) => {
        expect(feeds).toEqual(mockFeeds);
        expect(feeds.length).toBe(mockFeeds.length);
        doneFn();
      });

      const url = base_url + '/feed/search' + '?skip=' + options.skip + '&limit='
          + options.limit + '&q=' + search;
      const req = httpController.expectOne(url);
      req.flush({ ok: true, feeds: mockFeeds });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('map in user resource function', () => {
    it('should return feeds without changes if user is not authenticated', () => {
      const mockFeeds: Feed[] = getFeedsMock();
      const feeds = feedService.mapInUserResource(mockFeeds);

      expect(feeds).toEqual(mockFeeds);
    });

    it('should return feeds with user resource if user is authenticated', () => {
      const mockFeeds: Feed[] = getFeedsMock(2);
      const mockUser: User = getUserMock();

      spyAuthService.getUserActive.and.returnValue(mockUser);

      const feeds = feedService.mapInUserResource(mockFeeds);

      expect(feeds).toEqual(mockFeeds);
    });

    it('should return feed with user resource if user is authenticated', () => {
      const mockFeed: Feed = getFeedMock();
      const mockUser: User = getUserMock();

      spyAuthService.getUserActive.and.returnValue(mockUser);

      const feeds = feedService.mapInUserResource(mockFeed);

      expect(feeds).toEqual(mockFeed);
    });
  });
});
