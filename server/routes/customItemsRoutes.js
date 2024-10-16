import express from "express";
import {
  getAllCustomItems,
  getCustomItem,
  createCustomItem,
  updateCustomItem,
  deleteCustomItem,
  getOptions,
} from "../controllers/customItemController.js";

const router = express.Router();

router.get("/custom-items", getAllCustomItems);
router.get("/custom-items/:id", getCustomItem);
router.post("/custom-items", createCustomItem);
router.put("/custom-items/:id", updateCustomItem);
router.delete("/custom-items/:id", deleteCustomItem);
router.get("/options", getOptions);

export default router;
