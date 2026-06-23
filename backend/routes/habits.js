import express from "express";
import {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    archiveHabit,
    reorderHabits,
} from "../controllers/habitController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getHabits);
router.post("/", protect, createHabit);
router.put("/reorder", protect, reorderHabits);
router.put("/:id", protect, updateHabit);
router.delete("/:id", protect, deleteHabit);
router.put("/:id/archive", protect, archiveHabit);

export default router;