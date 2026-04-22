import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (ctx, next) => {
  const response = await next();
  if (ctx.url.pathname === "/") {
    response.headers.append(
      "Link",
      [
        '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"',
        '</sitemap-index.xml>; rel="sitemap"; type="application/xml"',
      ].join(", ")
    );
  }
  return response;
});
