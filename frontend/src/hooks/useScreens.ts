import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const token = localStorage.getItem("token");

export interface Screen {
  _id: string;
  name: string;
  isActive: boolean;
}

export interface ScreensResponse {
  items: Screen[];
  total: number;
}

export const useScreens = (search: string, page: number, limit: number) => {
  return useQuery<ScreensResponse, Error>({
    queryKey: ["screens", search, page, limit],
    queryFn: async () => {
      const res = await axios.get<ScreensResponse>("/screens", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });
};

export const useToggleScreen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const res = await axios.put(
        `/screens/${id}`,
        { isActive },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
  });
};
