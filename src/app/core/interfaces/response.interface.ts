import { Feed } from "../models/feed.model";

export interface IResponseFeed {
  ok: boolean;
  feeds: Feed[];
  feed: Feed;
  msg?: string;
};
