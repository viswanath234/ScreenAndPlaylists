// backend/
// │── package.json
// │── tsconfig.json
// │── server.ts
// │── app.ts
// │
// ├── config/
// │   └── database.ts
// │
// ├── models/
// │   ├── Screen.ts
// │   └── Theatre.ts
// │
// ├── controllers/
// │   ├── screenController.ts
// │   └── theatreController.ts
// │
// └── routes/
//     ├── screenRoutes.ts
//     └── theatreRoutes.ts

import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
