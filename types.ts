export enum ContentType {
  SOCIAL_POST = 'Social Media Post',
  PRODUCT_DESC = 'Product Description',
  BLOG_POST = 'Blog Post',
  EMAIL_COPY = 'Email Marketing Copy',
  AD_COPY = 'Ad Copy',
  TAGLINE = 'Tagline / Slogan',
}

export enum Platform {
  INSTAGRAM = 'Instagram',
  LINKEDIN = 'LinkedIn',
  TWITTER = 'X (Twitter)',
  FACEBOOK = 'Facebook',
  GOOGLE_ADS = 'Google Ads',
  GENERAL = 'General',
}

export enum Tone {
  PROFESSIONAL = 'Professional',
  CASUAL = 'Casual',
  ENTHUSIASTIC = 'Enthusiastic',
  WITTY = 'Witty',
  URGENT = 'Urgent',
  LUXURY = 'Luxury',
  EMPATHETIC = 'Empathetic',
}

export interface FormData {
  contentType: ContentType;
  platform: Platform;
  topic: string;
  audience: string;
  tone: Tone;
  details: string;
}

export interface GenerationResult {
  content: string;
  timestamp: Date;
  type: ContentType;
}