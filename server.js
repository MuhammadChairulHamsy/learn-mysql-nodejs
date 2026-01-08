import express from "express";
import path from 'path'
import { fileURLToPath } from "url";
import mahasiswaRoute from "./src/routes/mahasiswa.route.js";
import pageMahasiswaRoute from "./src/routes/pageMahasiswa.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "views"); 

app.use(express.static(path.join(__dirname, "public")))

// API → JSON
app.use("/api/mahasiswa", mahasiswaRoute);

// PAGE → EJS
app.use("/", pageMahasiswaRoute);

if (process.env.NODE_ENV !== "production") {
  app.listen(8000, () => {
    console.log("Server running at http://localhost:8000");
  });
}
export default app;