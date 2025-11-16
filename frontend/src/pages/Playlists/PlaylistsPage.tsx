import React, { useState, useEffect } from "react";
import axios from "axios";

interface Playlist {
  _id: string;
  name: string;
  itemUrls?: string[];
  itemCount: number;
}

const PlaylistsPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [name, setName] = useState("");
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // JWT from login

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/playlists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaylists(res.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch playlists");
      setLoading(false);
    }
  };

  const createPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const itemUrls = urls
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url);
      if (itemUrls.length > 10) throw new Error("Max 10 URLs allowed");

      await axios.post(
        "/playlists",
        { name, itemUrls },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      setUrls("");
      fetchPlaylists();
    } catch (err: any) {
      setError(err.message || "Failed to create playlist");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div>
      <h1>Playlists</h1>
      <form onSubmit={createPlaylist}>
        <input
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="One URL per line (optional, max 10)"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
        <button type="submit">Create Playlist</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {playlists.map((p) => (
          <li key={p._id}>
            {p.name} ({p.itemCount} items)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistsPage;
