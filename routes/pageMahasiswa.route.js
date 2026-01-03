import express from "express";
import {
  getMahasiswaPage,
  getEditPage,
  updateMahasiswa,
  tambahMahasiswa
} from "../controllers/pageMahasiswa.controller.js";

const router = express.Router();

// Halaman utama / daftar mahasiswa
router.get("/", getMahasiswaPage);           // opsional: akses dari root
router.get("/mahasiswa", getMahasiswaPage);  // akses dari /mahasiswa

// Form tambah mahasiswa (POST dari halaman daftar)
router.post("/mahasiswa/tambah", tambahMahasiswa);

// Halaman edit
router.get("/mahasiswa/edit/:nim", getEditPage);        // GET form edit
router.post("/mahasiswa/edit/:nim", updateMahasiswa);    // POST update data

export default router;