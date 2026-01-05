import db from "../config/db.js";

// GET DATA (API)
export const getMahasiswa = async (req, res) => {
  try {
    const sql = "SELECT * FROM mahasiswa";
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// INSERT DATA
export const insertMahasiswa = async (req, res) => {
  try {
    const { nim, nama, jurusan, angkatan, alamat } = req.body;
    const sql = `INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, alamat) VALUES (?, ?, ?, ?, ?)`;

    await db.query(sql, [nim, nama, jurusan, angkatan, alamat]);
    res.redirect("/mahasiswa");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Insert gagal" });
  }
};

