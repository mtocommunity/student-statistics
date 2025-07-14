/**
 * Provisional logger configuration.
 */

import picocolors from "picocolors"

const levelColors = {
  info: picocolors.blue,
  warn: picocolors.yellow,
  error: picocolors.red,
  debug: picocolors.cyan,
} as const

type LogLevel = keyof typeof levelColors

function getPrefix(level: LogLevel) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  const color = levelColors[level] || picocolors.gray
  return `${picocolors.gray(time)} ${color(`[${level.toUpperCase()}]`)}`
}

const logger = {
  info: (...args: unknown[]) => {
    console.info(getPrefix("info"), ...args)
  },
  warn: (...args: unknown[]) => {
    console.warn(getPrefix("warn"), ...args)
  },
  error: (...args: unknown[]) => {
    console.error(getPrefix("error"), ...args)
  },
  debug: (...args: unknown[]) => {
    console.debug(getPrefix("debug"), ...args)
  },
}

export default logger
