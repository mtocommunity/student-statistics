import { tw } from "@/lib/tailwind"

export const labelBaseClassName = tw`flex flex-col gap-1`
export const inputBaseClassName = tw`peer w-full py-2 text-sm`
export const svgInputBaseClassName = tw`absolute top-1/2 right-0 size-9 -translate-y-1/2 px-2 py-2 peer-[[aria-invalid=true]]:text-red-400`
