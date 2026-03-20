import { Router } from 'express';
import { listMetrics } from '../controllers/metrics.controller';

export const metricsRouter = Router();

metricsRouter.get('/', listMetrics);
