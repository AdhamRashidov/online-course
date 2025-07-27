import { Router } from 'express';
import adminRouter from './admin.route.js';
import { pageError } from '../error/page-not-found.error.js';

const router = Router();

router
    .use('/admin', adminRouter)
    .use(pageError)

export default router;