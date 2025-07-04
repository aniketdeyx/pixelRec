import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function RootLayout({ children }: { children: ReactNode }) {
    return ( 
        <>
        <main className="mx-auto">
            <Navbar />
            {children}
            
        </main>

        </>
     );
}

export default RootLayout;