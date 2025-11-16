import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Screen from "../models/Screen";
import Playlist from "../models/Playlist";

dotenv.config();
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/screens-playlists";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing data
    await User.deleteMany({});
    await Screen.deleteMany({});
    await Playlist.deleteMany({});

    // Seed Users
    const users = [
      { email: "admin@example.com", password: "Admin123!", role: "ADMIN" },
      { email: "editor@example.com", password: "Editor123!", role: "EDITOR" },
    ];
    for (const u of users) {
      const user = new User(u);
      await user.save();
    }

    // Seed Screens
    const screens = [
      { name: "Lobby Screen 1", isActive: true },
      { name: "Conference Room Screen", isActive: false },
      { name: "Reception Display", isActive: true },
    ];
    await Screen.insertMany(screens);

    // Seed Playlists
    const playlists = [
      {
        name: "Welcome Playlist",
        itemUrls: [
          "https://example.com/video1.mp4",
          "https://example.com/video2.mp4",
        ],
      },
      { name: "Promo Playlist", itemUrls: ["https://example.com/ad1.mp4"] },
    ];
    await Playlist.insertMany(playlists);

    console.log("Seed completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed", err);
    process.exit(1);
  }
};

seed();
