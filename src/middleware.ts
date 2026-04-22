import { defineMiddleware } from "astro:middleware";

const HOMEPAGE_LINK_HEADER = [
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</sitemap-index.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

export const onRequest = defineMiddleware(async (ctx, next) => {
  const response = await next();
  if (ctx.url.pathname === "/") {
    response.headers.append("Link", HOMEPAGE_LINK_HEADER);
  }
  return response;
});
