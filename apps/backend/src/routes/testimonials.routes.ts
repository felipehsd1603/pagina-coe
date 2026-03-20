import { Router } from 'express';
import { listTestimonials } from '../controllers/testimonials.controller';

export const testimonialsRouter = Router();

testimonialsRouter.get('/', listTestimonials);
