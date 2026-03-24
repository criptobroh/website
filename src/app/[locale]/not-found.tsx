import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-brand mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-8">
          Page not found / Pagina no encontrada
        </p>
        <Button href="/" variant="secondary">
          Go home / Ir al inicio
        </Button>
      </div>
    </main>
  );
}
