import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
// Fontes auto-hospedadas via npm (@fontsource) em vez de next/font/google:
// evita depender de fonts.googleapis.com em tempo de build (ambientes sem
// acesso à internet / atrás de proxy restrito). Nomes de família ficam
// mapeados para as variáveis --font-* em globals.css.
// Fonte oficial da MXM (Brandbook 3.0): Poppins — única família tipográfica
// da marca, usada em títulos E em texto corrido (ver globals.css --font-sans).
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/spline-sans-mono/400.css";
import "@fontsource/spline-sans-mono/500.css";
import "@fontsource/spline-sans-mono/700.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { ConnectionGuard } from "@/components/common/ConnectionGuard";
import { themeScript } from "@/lib/theme-script";
import { I18nProvider } from "@/components/providers/I18nProvider";

// Nota: metadata estática (não varia por idioma). O app name "MXM Cognos"
// fica igual em qualquer locale (nome próprio, como a maioria dos produtos
// faz). A descrição fica em inglês — mesmo padrão do projeto original —
// para não forçar português em buscas/previews de usuários de outros
// idiomas; localizar por idioma exigiria metadata dinâmica (generateMetadata)
// lendo o locale no servidor, o que esse projeto não suporta hoje (o i18n
// roda só no cliente, sem SSR).
export const metadata: Metadata = {
  title: "MXM Cognos",
  description: "AI-powered research and knowledge assistant — MXM Sistemas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <ErrorBoundary>
          <ThemeProvider>
            <QueryProvider>
              <I18nProvider>
                <ConnectionGuard>
                  {children}
                  <Toaster />
                </ConnectionGuard>
              </I18nProvider>
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
