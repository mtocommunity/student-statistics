import { TextInput } from "@/form/components/molecules/text-input"
import type { Control } from "react-hook-form"
import type { ZodObject } from "zod/v4"
import type { $ZodShape, $ZodTypeDef } from "zod/v4/core"

// Unsupported type error
export class UnsupportedInputTypeError extends Error {
  constructor(type: string) {
    super(`Unsupported input type: ${type}`)
    this.name = "UnsupportedInputTypeError"
  }
}

// Default values for types
const defaultValues: Partial<Record<$ZodTypeDef["type"], unknown>> = {
  string: "",
}

// Input factory
interface ControlledInputFactoryOptions<Shape extends $ZodShape = $ZodShape> {
  control: Control
  schema: ZodObject<Shape>
  disabled?: {
    [key in keyof Shape]?: boolean
  }
  labels?: {
    [key in keyof Shape]?: string
  }
}

/**
 * Factory to create controlled inputs based on a Zod schema.
 * @param options - Options containing the schema, control, and optional labels.
 * @returns An array of React elements representing the inputs.
 */
export function controlledInputFactory({
  schema,
  control,
  labels,
  disabled = {},
}: ControlledInputFactoryOptions): React.ReactElement[] {
  // Extract the shape of the validator
  const shape = schema.shape

  // Create inputs based on the shape
  const inputs: React.ReactElement[] = []

  for (const [key, value] of Object.entries(shape)) {
    let zodType = value._zod.def.type
    let zodDefinition = value._zod.def
    const label = labels?.[key] ?? key
    const defaultValue = defaultValues[zodType]
    const isDisabled = disabled[key] ?? false

    while (
      (zodType === "optional" || zodType === "nonoptional") &&
      "innerType" in zodDefinition &&
      zodDefinition.innerType &&
      typeof zodDefinition.innerType === "object" &&
      "def" in zodDefinition.innerType
    ) {
      zodDefinition = zodDefinition.innerType.def as $ZodTypeDef
      zodType = zodDefinition.type
    }

    switch (zodType) {
      case "string":
        inputs.push(
          <TextInput
            key={key}
            control={control}
            name={key}
            label={label}
            defaultValue={defaultValue}
            inputProps={{
              readOnly: isDisabled,
              tabIndex: isDisabled ? -1 : 0,
            }}
          />
        )
        break
      case "number":
        // TODO: Change to number input
        inputs.push(
          <TextInput
            key={key}
            control={control}
            name={key}
            label={label}
            inputProps={{
              type: "number",
              readOnly: isDisabled,
              tabIndex: isDisabled ? -1 : 0,
            }}
            defaultValue={defaultValue}
          />
        )
        break
      default:
        throw new UnsupportedInputTypeError(zodType)
    }
  }

  return inputs
}
