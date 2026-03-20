import { Router } from 'express';
import { createDemand } from '../controllers/demands.controller';

export const demandsRouter = Router();

demandsRouter.post('/', createDemand);
