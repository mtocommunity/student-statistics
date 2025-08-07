import { TextInput } from "@/form/components/molecules/text-input"
import type { Control } from "react-hook-form"
import type { ZodObject } from "zod/v4"
import type { $ZodShape, $ZodTypeDef } from "zod/v4/core"

// Default values for types
const defaultValues: Partial<Record<$ZodTypeDef["type"], unknown>> = {
  string: "",
}

// Input factory
interface ControlledInputFactoryOptions<Shape extends $ZodShape = $ZodShape> {
  control: Control
  schema: ZodObject<Shape>
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
}: ControlledInputFactoryOptions): React.ReactElement[] {
  // Extract the shape of the validator
  const shape = schema.shape

  // Create inputs based on the shape
  const inputs: React.ReactElement[] = []

  for (const [key, value] of Object.entries(shape)) {
    const valueType = value._zod.def.type
    const label = labels?.[key] ?? key
    const defaultValue = defaultValues[valueType]

    switch (valueType) {
      case "string":
        inputs.push(
          <TextInput
            key={key}
            control={control}
            name={key}
            label={label}
            defaultValue={defaultValue}
          />
        )
        break
      default:
        throw new Error(`Unsupported input type: ${valueType}`)
    }
  }

  return inputs
}
