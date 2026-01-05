import express from "express";
import {
  getMahasiswaPage,
  getEditPage,
  updateMahasiswa,
  tambahMahasiswa,
  deleteMahasiswa,
} from "../controllers/pageMahasiswa.controller.js";

const router = express.Router();

// Halaman utama / daftar mahasiswa
router.get("/", getMahasiswaPage);
router.get("/mahasiswa", getMahasiswaPage);

// Form tambah mahasiswa (POST dari halaman daftar)
router.post("/mahasiswa/tambah", tambahMahasiswa);

// Halaman edit
router.get("/mahasiswa/edit/:nim", getEditPage);
router.post("/mahasiswa/edit/:nim", updateMahasiswa);

router.post("/mahasiswa/hapus/:nim", deleteMahasiswa);

export default router;
