import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function RootLayout({ children }: { children: ReactNode }) {
    return ( 
        <main className="mx-auto m-4">
            <Navbar />
            {children}
        </main>
     );
}

export default RootLayout;