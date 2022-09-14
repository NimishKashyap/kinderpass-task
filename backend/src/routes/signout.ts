import express, { Request, Response } from "express";

const router = express.Router();

/**
 * Controller to manage signout
 * @param none
 */
router.post("/api/manager/signout", async (req: Request, res: Response) => {
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
