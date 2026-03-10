// Get ip
interface GetIpProps {
  request: Request
}

type GetIpReturn = "unknown" | (string & {})

export function getIp({ request: { headers } }: GetIpProps): GetIpReturn {
  const ip: GetIpReturn = headers.get("x-real-ip") || "unknown"

  return ip
}
