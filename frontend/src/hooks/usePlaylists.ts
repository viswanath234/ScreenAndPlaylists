// src/hooks/usePlaylists.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePlaylists = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const res = await axios.get("/playlists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    staleTime: 1000 * 60,
  });
};
