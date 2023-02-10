import { post, patch, get } from "./index";

export const getChannels = (serverId) =>
  get("/api/server/channels/" + serverId);
export const getChannel = (channelId) =>
  get("/api/server/channel/" + channelId);
