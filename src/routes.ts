import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ComplimentController } from "./controllers/ComplimentController";
import { TagController } from "./controllers/TagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const tagController = new TagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new ComplimentController();

router.post("/users", createUserController.handle);

router.post("/tags", ensureAuthenticated, ensureAdmin, tagController.handle);
router.get("/tags", ensureAuthenticated, tagController.listTags);

router.post("/login", authenticateUserController.handle);

router.post("/compliments", ensureAuthenticated, complimentController.handle);
router.get("/compliments/sender", ensureAuthenticated, complimentController.listSender);
router.get("/compliments/receiver", ensureAuthenticated, complimentController.listReceiver);

export { router };