import Express from 'express';
import { verifiedUsersCount } from '../../controllers/admin/user.controller.js';

const adminUserRouter = Express.Router();

adminUserRouter.get('/count',verifiedUsersCount);

export default adminUserRouter;