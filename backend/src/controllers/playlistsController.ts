import { Request, Response } from "express";
import Playlist from "../models/Playlist";

export const getPlaylists = async (req: Request, res: Response) => {
  const { search = "", page = 1, limit = 10 } = req.query;
  const q = { name: { $regex: search, $options: "i" } };
  const items = await Playlist.find(q as any)
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));
  res.json({ items });
};

export const createPlaylist = async (req: Request, res: Response) => {
  const { name, itemUrls } = req.body;
  const playlist = await Playlist.create({ name, itemUrls });
  res.status(201).json(playlist);
};
