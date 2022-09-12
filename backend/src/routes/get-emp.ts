import {
  currentUser,
  NotFoundError,
  requireAuth,
} from "@nimishkashyap031/common";
import express, { Request, Response } from "express";
import { Employee } from "../models/employee";

const router = express.Router();

router.get(
  "/api/emp/all",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const allEmployees = await Employee.find({});
    if (!allEmployees) {
      throw new Error("Something went wrong");
    }

    res.status(200).send(allEmployees);
  }
);

router.get(
  "/api/emp/:empid",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { empid } = req.params;

    const employee = await Employee.findOne({ empId: empid });

    if (!employee) {
      throw new NotFoundError();
    }
    res.status(200).send(employee);
  }
);

export { router as getEmpRouter };
