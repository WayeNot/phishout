import "./globals.css"
import Providers from "./providers"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="min-h-screen flex flex-col">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}