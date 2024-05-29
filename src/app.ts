import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// applications routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  const a = "PH university server is running...";
  res.send(a);
});


// global error handler  
app.use(globalErrorHandler);

// not found 
app.use(notFound)

export default app;
