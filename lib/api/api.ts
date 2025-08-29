import axios from 'axios';

export default function getBaseUrl(): string {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  throw new Error('Base URL is not defined in environment variables');
}

export const nextServer = axios.create({
  baseURL : process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});