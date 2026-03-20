export interface ITestimonial {
  id: string;
  appId?: string;
  appName?: string;
  authorName: string;
  authorRole: string;
  authorUnit?: string;
  authorPhoto?: string;
  content: string;
  rating?: number;
  isPublished: boolean;
  createdAt: string;
}
