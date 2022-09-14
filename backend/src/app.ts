import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import cors from "cors";
import "express-async-errors";

import { errorHandler } from "@nimishkashyap031/common";
import { NotFoundError } from "@nimishkashyap031/common";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { createEmpRouter } from "./routes/create-emp";
import { updateEmpRouter } from "./routes/update-emp";
import { getEmpRouter } from "./routes/get-emp";
import { deleteEmpRouter } from "./routes/delete-emp";

const app = express();

app.set("trust proxy", true);
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(createEmpRouter);
app.use(updateEmpRouter);
app.use(getEmpRouter);
app.use(deleteEmpRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
