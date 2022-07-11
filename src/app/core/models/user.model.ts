import { Website } from "./website.model";

export class User {
  constructor(
    public email: string,
    public active: boolean,
    public google: boolean,
    public darkMode: boolean,
    public name?: string,
    public lastName?: string,
    public image?: string,
    public password?: string,
    public subscriptions?: Website[],
    public readFeeds?: Website[],
    public savedFeeds?: Website[],
  ) {}
}
