import Image from "next/image";
import Link from "next/link";

function SignInPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="w-full p-4 m-4 max-w-[90%] mx-auto text-2xl font-bold">
                <Link href='/'>PixelRec</Link>
            </div>
            <div className="mx-auto mt-20 max-w-[40%]">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, aliquid? Neque vel id asperiores, dolorem corporis adipisci fugiat accusamus voluptate!</p>
            </div>
            {/* Centered Sign-in Box */}
            <div className="flex-grow flex flex-col items-center mt-30">
                <h3 className="text-3xl font-bold mb-4">Welcome!</h3>
                <div className="flex items-center gap-2 bg-white px-6 py-2 rounded-xl shadow cursor-pointer hover:bg-gray-100">
                    <p>Sign in with Google</p>
                    <Image
                        src='/assets/images/google.svg'
                        height={30}
                        width={30}
                        alt='Google Logo'
                    />
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
