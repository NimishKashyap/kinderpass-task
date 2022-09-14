import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { BadRequestError } from "@nimishkashyap031/common";
import { validateRequest } from "@nimishkashyap031/common";
import { Manager as User } from "../models/manager";

const router = express.Router();

router.post(
  "/api/manager/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstname, lastname, address, dob, company, email, password } =
      req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({
      firstname,
      lastname,
      address,
      dob,
      company,
      email,
      password,
    });

    await user.save();
    // Generate jsonwebtoken

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = { jwt: userJwt };

    res.status(201).send({ jwt: userJwt });
  }
);

export { router as signupRouter };
