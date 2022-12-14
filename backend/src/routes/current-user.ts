import express, { Request, Response } from "express";
import { currentUser } from "@nimishkashyap031/common";
const router = express.Router();

router.put(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
