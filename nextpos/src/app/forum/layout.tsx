// app/layout.tsx
import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/AuthContext"; // Adjust path
import { ThemeProvider } from "@/app/theme-provider"; // Assuming you have this
import { Toaster } from "@/components/ui/toaster"; // Adjust path


export const metadata: Metadata = {
  title: "Superpos Quantum Platform", // Default title
  description: "Interactive Quantum Computing Education",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
         <ThemeProvider
            attribute="class"
            defaultTheme="dark" // Or your preferred default
            enableSystem
            disableTransitionOnChange
          >
            <AuthContextProvider> {/* Wrap with Auth Provider */}
                {children}
                <Toaster /> {/* Include Toaster globally */}
            </AuthContextProvider>
        </ThemeProvider>
  );
}