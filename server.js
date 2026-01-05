import express from "express";
import mahasiswaRoute from "./src/routes/mahasiswa.route.js";
import pageMahasiswaRoute from "./src/routes/pageMahasiswa.route.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views"); 

// API → JSON
app.use("/api/mahasiswa", mahasiswaRoute);

// PAGE → EJS
app.use("/", pageMahasiswaRoute);

app.listen(8000, () => {
  console.log("Server ready...");
});