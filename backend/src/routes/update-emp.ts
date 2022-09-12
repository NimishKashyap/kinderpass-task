import {
  currentUser,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@nimishkashyap031/common";
import express, { Request, Response } from "express";

import { body } from "express-validator";
import { Employee } from "../models/employee";

const router = express.Router();

router.put(
  "/api/emp/update/:empid",
  currentUser,
  requireAuth,
  [
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
    const { empid } = req.params;
    const emp = await Employee.findOne({ empId: empid });
    if (!emp) {
      throw new NotFoundError();
    }

    emp.set({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      mobile: req.body.mobile,
      city: req.body.city,
    });

    await emp.save();
    res.status(201).send(emp);
  }
);

export { router as updateEmpRouter };
