import db from "../config/db.js";

// Tampilkan halaman daftar mahasiswa
export const getMahasiswaPage = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM mahasiswa ORDER BY nim");

    const defaultMajor = [
      "Sistem informasi",
      "Teknik informatika",
      "Manajemen informatika",
      "Komputerisasi akuntansi",
      "Bisnis digital",
    ];


    const allMajor = [
      ...new Set([
        ...defaultMajor,
        ...rows.map((m) => m.jurusan).filter((j) => j && j.trim() !== ""),
      ]),
    ].sort();

    res.render("index", {
      mahasiswa: rows,
      title: "Dashboard",
      listOfMajors: allMajor,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Server Error");
  }
};

// Tampilkan form edit mahasiswa berdasarkan NIM
export const getEditPage = async (req, res) => {
  try {
    const { nim } = req.params;
    const [rows] = await db.query("SELECT * FROM mahasiswa WHERE nim = ?", [
      nim,
    ]);

    if (rows.length === 0) {
      return res.status(404).send("Mahasiswa tidak ditemukan");
    }

    const defaultMajor = [
      "Teknik informatika",
      "Sistem informasi",
      "Manajemen informatika",
      "Komputerisasi akuntansi",
      "Bisnis digital",
    ];

    // Ambil daftar jurusan unik untuk dropdown (sama seperti di halaman utama)
    const [allRows] = await db.query(
      "SELECT DISTINCT jurusan FROM mahasiswa WHERE jurusan IS NOT NULL AND jurusan != ''"
    );

    const dbJurusan = allRows.map((row) => row.jurusan.trim());

    const listOfMajors = [
      ...new Set([...defaultMajor, ...dbJurusan]),
    ].sort();

    res.render("edit", {
      mahasiswa: rows[0],
      title: "Edit Mahasiswa",
      listOfMajors: listOfMajors,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Server Error");
  }
};

// Proses update data mahasiswa
export const updateMahasiswa = async (req, res) => {
  try {
    const { nim } = req.params;
    const { nama, jurusan, angkatan, alamat } = req.body;

    const sql = `UPDATE mahasiswa 
                 SET nama = ?, jurusan = ?, angkatan = ?, alamat = ? 
                 WHERE nim = ?`;

    const [result] = await db.query(sql, [
      nama,
      jurusan,
      angkatan,
      alamat,
      nim,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send("Mahasiswa tidak ditemukan atau data tidak berubah");
    }

    res.redirect("/mahasiswa");
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).send("Gagal menyimpan perubahan");
  }
};

// Proses tambah mahasiswa (dari form di halaman daftar)
export const tambahMahasiswa = async (req, res) => {
  try {
    const { nim, nama, jurusan, angkatan, alamat } = req.body;

    const sql = `INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, alamat) 
                 VALUES (?, ?, ?, ?, ?)`;

    await db.query(sql, [nim, nama, jurusan, angkatan, alamat]);

    res.redirect("/mahasiswa");
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).send("Nim Tidak Boleh Sama Gagal Menambahkan Mahasiswa");
  }
};

export const deleteMahasiswa = async (req, res) => {
  try {
    const { nim } = req.params;

    const sql = `DELETE FROM mahasiswa WHERE nim = ?`;
    const [result] = await db.query(sql, [nim]);

    if (result.affectedRows === 0) {
      res.status(404).send("Mahasiswa tidak di temukan");
    }

    res.redirect("/mahasiswa");
  } catch (error) {
    console.error("Delete error: ", error);
    res.status(500).send("Gagal menghapus mahasiswa");
  }
};
