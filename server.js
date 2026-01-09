import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mahasiswaRoute from "./src/routes/mahasiswa.route.js";
import pageMahasiswaRoute from "./src/routes/pageMahasiswa.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.urlencoded({ extended: true }));

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // 🔥 FIX UTAMA

// static file
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/mahasiswa", mahasiswaRoute);
app.use("/", pageMahasiswaRoute);

// local only
if (process.env.NODE_ENV !== "production") {
  app.listen(8000, () => {
    console.log("Server running at http://localhost:8000");
  });
}

export default app;
