import { tw } from "@/lib/tailwind"

export const authFormStyles = {
  labelClassname: tw`flex flex-col gap-1`,
  inputClassname: tw`peer w-full py-2 text-sm`,
  svgInputClassname: tw`absolute top-1/2 right-0 size-9 -translate-y-1/2 px-2 py-2 peer-[[aria-invalid=true]]:text-red-400`,
}
