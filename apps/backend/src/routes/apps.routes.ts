import { Router } from 'express';
import { listApps, getAppBySlug } from '../controllers/apps.controller';

export const appsRouter = Router();

appsRouter.get('/', listApps);
appsRouter.get('/:slug', getAppBySlug);
