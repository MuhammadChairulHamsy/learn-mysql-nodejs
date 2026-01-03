import express from "express";
import { getMahasiswa,insertMahasiswa, editMahasiswa, getMahasiswaByNim } from "../controllers/mahasiswa.controller.js";

const router = express.Router();

router.get("/", getMahasiswa)
router.post("/tambah", insertMahasiswa);
router.get("/edit:nim", getMahasiswaByNim);
router.post("/edit/:nim", editMahasiswa);


export default router;