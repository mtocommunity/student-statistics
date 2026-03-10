import { getIp } from "@/api/utils/get-ip"
import { getUserAgent } from "@/api/utils/get-user-agent"
import { serverLog } from "@/core/log/server-logger"
import { defineMiddleware } from "astro:middleware"

// Middleware
export const onLoggerRequest = defineMiddleware((ctx, next) => {
  if (ctx.isPrerendered) return next()

  // Get all the request info
  const requestId = Bun.randomUUIDv7()
  const ip = getIp({ request: ctx.request })
  const userAgent = getUserAgent({ request: ctx.request })
  const path = ctx.originPathname

  // Generate the log child and attach it to locals
  const log = serverLog.child({
    requestId,
    path,
    ip,
    userAgent,
  })

  ctx.locals.log = log

  return next()
})
