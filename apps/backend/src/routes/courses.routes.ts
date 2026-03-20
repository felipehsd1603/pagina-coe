import { Router } from 'express';
import { listCourses } from '../controllers/courses.controller';

export const coursesRouter = Router();

coursesRouter.get('/', listCourses);
