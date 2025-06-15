import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function RootLayout({ children }: { children: ReactNode }) {
    return ( 
        <>
        <main className="mx-auto bg-white">
            <Navbar />
            {children}
            
        </main>

        </>
     );
}

export default RootLayout;