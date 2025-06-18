import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { cn } from "@/lib/tailwind";
import { ReactComponent as Favicon } from "@assets/favicon.svg";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex w-full max-w-sm flex-col gap-6", className)}
      {...props}
    >
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Favicon className="size-24" />

            <h1 className="text-center text-xl font-bold">
              Student Statistics
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="code">Code</Label>
              <Input id="code" type="code" placeholder="C12345" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground text-center text-xs text-balance">
        ¿Ya tienes una cuenta?{" "}
        <a
          className="hover:text-primary underline underline-offset-4"
          href="/login"
        >
          Ingresa
        </a>
        .
      </div>
    </div>
  );
}
