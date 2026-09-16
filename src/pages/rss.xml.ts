import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

/** Umpan akar: arahkan ke umpan bahasa Indonesia (bawaan). */
export const GET: APIRoute = () =>
  new Response(null, { status: 301, headers: { Location: `${SITE.url}/id/rss.xml` } });
