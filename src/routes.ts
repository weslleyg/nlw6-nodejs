import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ComplimentController } from "./controllers/ComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new ComplimentController();

router.post("/users", createUserController.handle);

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);

router.post("/login", authenticateUserController.handle);

router.post("/compliments", ensureAuthenticated, complimentController.handle);
router.get("/compliments/sender", ensureAuthenticated, complimentController.listSender);
router.get("/compliments/receiver", ensureAuthenticated, complimentController.listReceiver);

export { router };