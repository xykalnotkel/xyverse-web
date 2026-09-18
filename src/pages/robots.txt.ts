import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = () => new Response(`# robots.txt — xyverse.my.id

User-agent: *
Allow: /
Disallow: /404
Crawl-delay: 1

# Mesin pencari utama — tanpa penundaan
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Pratinjau tautan media sosial
User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: TelegramBot
Allow: /

User-agent: Discordbot
Allow: /

User-agent: Slackbot-LinkExpanding
Allow: /

# Perayap pelatihan AI — tidak diizinkan
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Bytespider
Disallow: /

Sitemap: ${SITE.url}/sitemap-index.xml
Host: ${SITE.url}

# Umpan / Feeds
# ${SITE.url}/id/rss.xml
# ${SITE.url}/en/rss.xml
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
