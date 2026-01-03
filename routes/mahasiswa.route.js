import express from "express";
import { getMahasiswa,insertMahasiswa } from "../controllers/mahasiswa.controller.js";

const router = express.Router();

router.get("/", getMahasiswa)
router.post("/tambah", insertMahasiswa);

export default router;