import express, { Request, Response } from "express";
import {
  validateRequest,
  BadRequestError,
  requireAuth,
  currentUser,
} from "@nimishkashyap031/common";
import { body } from "express-validator";
import { Employee } from "../models/employee";

const router = express.Router();

router.post(
  "/api/emp/create",
  currentUser,
  requireAuth,
  [
    body("empId").trim().notEmpty().withMessage("empId should not be empty"),
    body("firstname").notEmpty().withMessage("First name should not be empty"),
    body("lastname").notEmpty().withMessage("lastname should not be empty"),
    body("address").notEmpty().withMessage("address should not be empty"),
    body("mobile")
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile number should be of length 10"),
    body("city").notEmpty().withMessage("city should not be empty"),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { empId, firstname, lastname, address, mobile, city } = req.body;
    const existingEmp = await Employee.findOne({ empId });
    if (existingEmp) {
      throw new BadRequestError("Employee Already Exists with given empId");
    }
    const emp = Employee.build({
      empId,
      firstname,
      lastname,
      address,
      mobile,
      city,
    });

    await emp.save();

    res.status(201).send(emp);
  }
);

export { router as createEmpRouter };
