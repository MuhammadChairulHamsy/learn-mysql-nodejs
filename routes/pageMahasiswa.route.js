import express from "express";
import { getMahasiswaPage } from "../controllers/pageMahasiswa.controller.js";

const router = express.Router();

router.get("/mahasiswa", getMahasiswaPage);

export default router;
