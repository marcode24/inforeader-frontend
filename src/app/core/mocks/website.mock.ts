import { faker } from "@faker-js/faker";

import { Website } from "@models/website.model";

export const getWebsitesMock = (): Website => ({
  name: faker.datatype.string(),
  image: faker.datatype.string(),
  description: faker.datatype.string(),
  link: faker.datatype.string(),
  linkFeed: faker.datatype.string(),
  _id: faker.datatype.string(),
  inUser: faker.datatype.boolean(),
});
