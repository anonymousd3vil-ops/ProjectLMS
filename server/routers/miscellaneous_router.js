import {Router} from 'express'

import { contactUs, userStats } from '../controllers/miscellaneous_controller.js';
import {authorizedRole, isLoggedIn } from '../middleware/auth_Middleware.js'

const miscRouter = Router();


miscRouter.route('/contactUs').post(contactUs);
miscRouter
    .route('/admin/stats/users')
    .get(isLoggedIn, authorizedRole('ADMIN'), userStats);

export default miscRouter;