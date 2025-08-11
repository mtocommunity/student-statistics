import { z, type ZodErrorMap } from "astro/zod"
import z4 from "zod/v4"

const spanishErrorMap: ZodErrorMap = (issue, context) => {
  let message: string

  switch (issue.code) {
    case "invalid_type":
      message =
        issue.received === "undefined"
          ? "Este campo es obligatorio"
          : `Se esperaba tipo ${issue.expected}, pero se recibió ${issue.received}`
      break

    case "invalid_literal":
      message = `Se esperaba el valor literal: ${JSON.stringify(issue.expected)}`
      break

    case "unrecognized_keys":
      message = `Clave(s) no reconocidas: ${issue.keys.join(", ")}`
      break

    case "invalid_union":
      message = "Valor no válido para ninguna opción del esquema"
      break

    case "invalid_union_discriminator":
      message = `Valor de discriminador inválido. Se esperaba uno de: ${issue.options.join(", ")}`
      break

    case "invalid_enum_value":
      message = `Valor inválido. Se esperaba uno de: ${issue.options.join(", ")}, pero se recibió '${issue.received}'`
      break

    case "invalid_arguments":
      message = "Argumentos inválidos"
      break

    case "invalid_return_type":
      message = "Tipo de retorno inválido"
      break

    case "invalid_date":
      message = "Fecha inválida"
      break

    case "invalid_string":
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Debe incluir "${issue.validation.includes}"`
          if (typeof issue.validation.position === "number")
            message += ` a partir de la posición ${issue.validation.position}`
        } else if ("startsWith" in issue.validation)
          message = `Debe comenzar con "${issue.validation.startsWith}"`
        else if ("endsWith" in issue.validation)
          message = `Debe terminar con "${issue.validation.endsWith}"`
        else message = "Cadena inválida"
      } else if (issue.validation === "regex")
        message = `Valor inválido: ${issue.validation}`
      else if (issue.validation === "email")
        message = "Debe ser un correo electrónico válido"
      else message = "Valor no válido"

      break

    case "too_small":
      switch (issue.type) {
        case "array":
          message = `Debe tener ${issue.exact ? "exactamente" : issue.inclusive ? "al menos" : "más de"} ${issue.minimum} elemento(s)`
          break
        case "string":
          message = `Debe tener ${issue.exact ? "exactamente" : issue.inclusive ? "al menos" : "más de"} ${issue.minimum} carácter(es)`
          break
        case "number":
          message = `Debe ser ${issue.exact ? "exactamente" : issue.inclusive ? "mayor o igual a" : "mayor que"} ${issue.minimum}`
          break
        case "date":
          message = `Debe ser una fecha ${issue.exact ? "exactamente igual a" : issue.inclusive ? "posterior o igual a" : "posterior a"} ${new Date(Number(issue.minimum)).toLocaleDateString()}`
          break
        default:
          message = "Valor demasiado pequeño"
      }
      break

    case "too_big":
      switch (issue.type) {
        case "array":
          message = `Debe tener ${issue.exact ? "exactamente" : issue.inclusive ? "como máximo" : "menos de"} ${issue.maximum} elemento(s)`
          break
        case "string":
          message = `Debe tener ${issue.exact ? "exactamente" : issue.inclusive ? "como máximo" : "menos de"} ${issue.maximum} carácter(es)`
          break
        case "number":
        case "bigint":
          message = `Debe ser ${issue.exact ? "exactamente" : issue.inclusive ? "menor o igual a" : "menor que"} ${issue.maximum}`
          break
        case "date":
          message = `Debe ser una fecha ${issue.exact ? "exactamente" : issue.inclusive ? "anterior o igual a" : "anterior a"} ${new Date(Number(issue.maximum)).toLocaleDateString()}`
          break
        default:
          message = "Valor demasiado grande"
      }
      break

    case "custom":
      message = "Entrada inválida"
      break

    case "invalid_intersection_types":
      message = "Los tipos de intersección no se pueden combinar"
      break

    case "not_multiple_of":
      message = `Debe ser múltiplo de ${issue.multipleOf}`
      break

    case "not_finite":
      message = "Debe ser un número finito"
      break

    default:
      message = context.defaultError
  }

  console.error(`Zod error: ${issue.code} - ${message}`, issue)

  return { message }
}

z.setErrorMap(spanishErrorMap)
z4.config({
  customError: (issue) => {
    issue.type = issue.origin

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return spanishErrorMap(issue, { defaultError: "Error de validación" })
  },
})
