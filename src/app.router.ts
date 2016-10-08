'use strict';

import * as express from 'express';

import BaseRoute from './routes/base.route';

//get express router
const router: express.Router = express.Router();

//routes assignment
router.get('/', BaseRoute.indexAction);

export default router;
