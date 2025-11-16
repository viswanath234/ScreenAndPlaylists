import axiosClient from "./axiosClient";

export type Screen = { _id: string; name: string; isActive: boolean };

export async function fetchScreens(search = "", page = 1, limit = 10) {
  const res = await axiosClient.get("/screens", {
    params: { search, page, limit },
  });
  return res.data;
}

export async function toggleScreen(id: string, isActive: boolean) {
  const res = await axiosClient.put(`/screens/${id}`, { isActive });
  return res.data;
}
