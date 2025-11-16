import { Request, Response } from "express";
import Screen from "../models/Screen";

export const getScreens = async (req: Request, res: Response) => {
  const { search = "", page = 1, limit = 10 } = req.query;
  const q = { name: { $regex: search, $options: "i" } };
  const items = await Screen.find(q as any)
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));
  res.json({ items });
};

export const toggleScreen = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const screen = await Screen.findByIdAndUpdate(
    id,
    { isActive },
    { new: true }
  );
  if (!screen) return res.status(404).json({ message: "Screen not found" });
  res.json(screen);
};
