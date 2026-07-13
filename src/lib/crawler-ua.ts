// Known non-JS-executing crawlers and link unfurlers. Used to gate edge-side
// article-body injection (see markdown-edge.ts) so humans get the same
// client-rendered experience as today, and only these UAs get pre-rendered
// content — see functions/writing/[slug].ts / functions/projects/[slug].ts.
export const BOT_USER_AGENTS = [
  // AI / LLM crawlers
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "Diffbot",
  "YouBot",
  // Traditional search crawlers
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  // Social / link unfurlers
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "Slackbot",
  "TelegramBot",
  "WhatsApp",
  "Discordbot",
  "redditbot",
  "SkypeUriPreview",
  "vkShare",
  "Pinterest",
] as const;

export function isBotUserAgent(ua: string | null | undefined): boolean {
  if (!ua) return false;
  const lower = ua.toLowerCase();
  return BOT_USER_AGENTS.some((token) => lower.includes(token.toLowerCase()));
}
