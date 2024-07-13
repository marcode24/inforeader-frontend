import { faker } from '@faker-js/faker';

import { Feed } from '@models/feed.model';

import { getWebsitesMock } from './website.mock';

export const getFeedMock = (): Feed => ({
  _id: faker.datatype.string(),
  writer: faker.datatype.string(),
  title: faker.datatype.string(),
  pubDate: faker.date.past(1),
  content: faker.datatype.string(),
  link: faker.datatype.string(),
  image: faker.datatype.string(),
  website: getWebsitesMock(),
  inUser: faker.datatype.boolean(),
  liked: faker.datatype.boolean(),
  likes: faker.datatype.number(),
});

export const getFeedsMock = (size = 10): Feed[] => {
  const feeds: Feed[] = [];
  for (let i = 0; i < size; i++) {
    feeds.push(getFeedMock());
  }
  return feeds;
};
