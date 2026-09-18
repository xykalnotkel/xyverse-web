import type { APIRoute } from 'astro';
import { SITE } from '../../data/site';

export const GET: APIRoute = () => new Response(`Contact: mailto:keamanan@xyverse.my.id
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: id, en
Canonical: ${SITE.url}/.well-known/security.txt
Policy: ${SITE.url}/id/legal/keamanan
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
