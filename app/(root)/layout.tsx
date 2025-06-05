import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function RootLayout({ children }: { children: ReactNode }) {
    return ( 
        <main className="mx-auto p-3 m-2 max-w-[95%]">
            <Navbar />
            {children}
        </main>
     );
}

export default RootLayout;