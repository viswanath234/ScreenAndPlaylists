import express from "express";
import { getScreens, toggleScreen } from "../controllers/screensController";
import { authMiddleware, roleMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/", authMiddleware, getScreens);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["EDITOR", "ADMIN"]),
  toggleScreen
);

export default router;
