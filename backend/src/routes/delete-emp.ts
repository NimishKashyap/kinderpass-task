import express, { Request, Response } from "express";
import { Employee } from "../models/employee";

const router = express.Router();

router.delete("/api/emp/:id/delete", async (req: Request, res: Response) => {
  const { id: empId } = req.params;
  console.log(empId);

  try {
    await Employee.deleteOne({ empId });
  } catch (err) {
    console.log(err);

    throw new Error("Something went wrong");
  }
  res.status(200).send("Deleted");
});

export { router as deleteEmpRouter };
