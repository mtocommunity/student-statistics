// Get agent
interface GetAgentProps {
  request: Request
}

type GetAgentReturn = "unknown" | (string & {})

export function getUserAgent({
  request: { headers },
}: GetAgentProps): GetAgentReturn {
  const agent: GetAgentReturn = headers.get("user-agent") || "unknown"

  return agent
}
