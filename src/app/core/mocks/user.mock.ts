import { faker } from "@faker-js/faker";

import { User } from "@models/user.model";

export const getUserMock = (): User => ({
  email: faker.datatype.string(),
  active: faker.datatype.boolean(),
  google: faker.datatype.boolean(),
  darkMode: faker.datatype.boolean(),
  name: faker.datatype.string(),
  lastName: faker.datatype.string(),
  image: faker.datatype.string(),
  password: faker.datatype.string(),
  subscriptions: [faker.datatype.string(5)],
  readFeeds: [faker.datatype.string(5)],
  savedFeeds: [faker.datatype.string(5)],
});
