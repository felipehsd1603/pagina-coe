import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminGuard } from '../middleware/adminGuard';
import {
  adminListApps, adminCreateApp, adminUpdateApp, adminDeleteApp,
} from '../controllers/admin/apps.admin.controller';
import {
  adminListTestimonials, adminCreateTestimonial, adminUpdateTestimonial, adminDeleteTestimonial,
} from '../controllers/admin/testimonials.admin.controller';
import {
  adminListDemands, adminUpdateDemand, adminDeleteDemand,
} from '../controllers/admin/demands.admin.controller';
import {
  adminListMetrics, adminUpsertMetric, adminDeleteMetric,
} from '../controllers/admin/metrics.admin.controller';
import {
  adminListCourses, adminCreateCourse, adminUpdateCourse, adminDeleteCourse,
} from '../controllers/admin/courses.admin.controller';

export const adminRouter = Router();

adminRouter.use(authMiddleware, adminGuard);

// Apps
adminRouter.get('/apps', adminListApps);
adminRouter.post('/apps', adminCreateApp);
adminRouter.put('/apps/:id', adminUpdateApp);
adminRouter.delete('/apps/:id', adminDeleteApp);

// Testimonials
adminRouter.get('/testimonials', adminListTestimonials);
adminRouter.post('/testimonials', adminCreateTestimonial);
adminRouter.put('/testimonials/:id', adminUpdateTestimonial);
adminRouter.delete('/testimonials/:id', adminDeleteTestimonial);

// Demands
adminRouter.get('/demands', adminListDemands);
adminRouter.put('/demands/:id', adminUpdateDemand);
adminRouter.delete('/demands/:id', adminDeleteDemand);

// Metrics
adminRouter.get('/metrics', adminListMetrics);
adminRouter.post('/metrics', adminUpsertMetric);
adminRouter.delete('/metrics/:id', adminDeleteMetric);

// Courses
adminRouter.get('/courses', adminListCourses);
adminRouter.post('/courses', adminCreateCourse);
adminRouter.put('/courses/:id', adminUpdateCourse);
adminRouter.delete('/courses/:id', adminDeleteCourse);
