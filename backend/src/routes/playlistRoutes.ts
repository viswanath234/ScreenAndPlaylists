import express from "express";
import {
  getPlaylists,
  createPlaylist,
} from "../controllers/playlistsController";
import { authMiddleware, roleMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/", authMiddleware, getPlaylists);
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["EDITOR", "ADMIN"]),
  createPlaylist
);

export default router;
