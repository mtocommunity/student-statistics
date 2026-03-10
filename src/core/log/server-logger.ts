import path from "path"
import pino, { type Logger } from "pino"
import { isDev } from "../../core/configuration/app-configuration"

// Types
export type Log = Logger // Alias

// Transport
const { dirname } = import.meta
const targetPath = path.join(dirname, "transport", "consola-transport.js")

// Logger
export const serverLoggerOptions: pino.LoggerOptions = {
  level: "debug",
  serializers: {
    err: pino.stdSerializers.err,
  },
  hooks: {
    logMethod(args, method) {
      const stack = new Error().stack
      const lastCall = stack?.split("\n")[3]

      if (lastCall) {
        const parenthesisIndex = lastCall.indexOf("(")
        const absoluteCaller = lastCall.slice(parenthesisIndex + 1, -1)
        let srcIndex = absoluteCaller.indexOf("/src/")

        if (srcIndex === -1) {
          srcIndex = absoluteCaller.indexOf("/dist/")
        }

        const caller =
          srcIndex >= 0 ? absoluteCaller.slice(srcIndex + 1) : absoluteCaller

        if (!caller) {
          return method.apply(this, args)
        }

        let firstArg = args[0]

        if (firstArg && typeof firstArg === "object") {
          if (firstArg instanceof Error) {
            firstArg = {
              err: firstArg,
              caller,
            }
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            firstArg.caller = caller
          }

          args[0] = firstArg
        } else {
          args.unshift({ caller })
        }
      }

      return method.apply(this, args)
    },
  },

  // Development configuration
  ...(isDev
    ? {
        base: undefined,
        transport: { target: targetPath },
      }
    : {}),
}

export const serverLog = pino(serverLoggerOptions)
