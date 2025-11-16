import axiosClient from "./axiosClient";

export type Playlist = { _id: string; name: string; itemCount: number };

export async function fetchPlaylists(search = "", page = 1, limit = 10) {
  const res = await axiosClient.get("/playlists", {
    params: { search, page, limit },
  });
  return res.data;
}

export async function createPlaylist(body: {
  name: string;
  itemUrls?: string[];
}) {
  const res = await axiosClient.post("/playlists", body);
  return res.data;
}
