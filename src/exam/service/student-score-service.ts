import type { ExamTable } from "@/exam/schema/exam-schema"
import { excelFormatSchema } from "@/exam/validation/excel-format-validation"
import * as XLSX from "xlsx"

// Service interface
export interface StudentScoreService<TInput> {
  process(input: TInput): Promise<ExamTable>
}

// Translations
const fieldTranslations: Record<keyof ExamTable, string> = {
  maxScorePerQuestion: "Máximo puntaje por pregunta",
  studentNames: "Nombres de los estudiantes",
  scores: "Puntajes",
}

// Excel service
export class StudentScoreExcelService implements StudentScoreService<File> {
  async process(input: File): Promise<ExamTable> {
    // Read the excel file
    const arrayBuffer = await this.readFileAsArrayBuffer(input)
    const data = new Uint8Array(arrayBuffer)

    // Get the sheet
    const workbook = XLSX.read(data, { type: "array" })
    const sheetName = workbook.SheetNames[0]

    if (!sheetName) throw new Error("No se ha encontrado alguna hoja")

    const sheet = workbook.Sheets[sheetName]

    if (!sheet) throw new Error("No se ha encontrado la hoja")

    // Process the sheet as json
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][]

    // Get the max score per questions
    const maxScorePerQuestion = json[0]?.slice(1) ?? []

    // Get the students
    const studentNames = json.slice(1).map((row) => row[0]!)

    // Get the scores
    const scores = json.slice(1).map((row) => row.slice(1))

    // Structure exam table
    const examTableRaw = {
      maxScorePerQuestion,
      studentNames,
      scores,
    }

    // Validate table
    const examTableValidation = excelFormatSchema.safeParse(examTableRaw)

    if (!examTableValidation.success) {
      console.error("Invalid exam table format", examTableValidation.error)

      const firstIssue = examTableValidation.error.issues[0]!
      let message = firstIssue.message

      if (
        firstIssue.code === "invalid_type" &&
        firstIssue.expected === "number"
      ) {
        message = `Se esperaba que la fila de ${fieldTranslations[firstIssue.path[0] as keyof ExamTable]} tuviera solo números`
      }

      throw new Error(message)
    }

    const examTable = examTableValidation.data

    return examTable
  }

  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (!reader.result) return reject(new Error("Archivo vacío"))
        resolve(reader.result as ArrayBuffer)
      }

      reader.onerror = () => {
        reject(new Error("Error al leer el archivo"))
      }

      reader.readAsArrayBuffer(file)
    })
  }
}

// Singleton service
export const studentScoreService: StudentScoreService<File> =
  new StudentScoreExcelService()
