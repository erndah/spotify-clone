import React from "react";
import {getProviders, signIn} from "next-auth/react"

export default function Login({providers}){
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img className="w-52 mb-5" src="https://i.imgur.com/fPuEa9V.png" alts="" />

            {Object.values(providers).map((provider) =>(
            <div key={provider.name}>
                <button 
                    className="bg-[#18D860] text-white p-5 rounded-lg"
                    onClick={() => signIn(provider.id, { callbackUrl: "/"})}
                >
                    Login with {provider.name}
                </button>

            </div>
        ))}
        </div>
    );
}

export async function getServerSideProps(){
    // servres side render
    const providers = await getProviders();

    return{
        props: {
            providers
        }
    }
}