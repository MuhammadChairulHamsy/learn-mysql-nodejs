import db from "../config/db.js";

export const getMahasiswaPage = async (req, res) => {
  try {
    const sql = "SELECT * FROM mahasiswa";
    const [rows] = await db.query(sql);

    res.render("index", {
      mahasiswa: rows,
      title: "Daftar Mahasiswa"
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
};
