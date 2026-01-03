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

// EDIT DATA - kita gunakan POST untuk kemudahan form HTML
export const editMahasiswa = async (req, res) => {
  try {
    const { nim } = req.params;
    const { nama, jurusan, angkatan, alamat } = req.body;

    const sql = `UPDATE mahasiswa SET nama = ?, jurusan = ?, angakatan = ?, alamat = ? WHERE nim = ?`;

    const [result] = await db.query(sql, [
      nim,
      nama,
      jurusan,
      angkatan,
      alamat,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    res.redirect("/mahasiswa");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update gagal" });
  }
};

// Tambahan: untuk menampilkan form edit (GET data per mahasiswa)
export const getMahasiswaByNim = async (req, res) => {
  try {
    const { nim } = req.params;
    const sql = "SELECT * FROM mahasiswa WHERE nim = ?";
    const [rows] = await db.query(sql, [nim]);

    if (rows.length === 0) {
      return res.status(404).send({ message: "Mahasiswa tidak ditemukan" });
    }

    res.render("edit", { mahasiswa: rows[0], title: "Edit Mahasiswa" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching data" });
  }
};
