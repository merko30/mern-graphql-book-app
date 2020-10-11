import React from "react"
import { Link } from "react-router-dom"

interface AuthLayoutProps {
    title: string;
    text: string;
    linkText:string;
    children: React.ReactNode;
    to:string;
}

const AuthLayout = ({title,text,to,linkText,children}:AuthLayoutProps) => {
  return (
    <div className="h-screen flex items-center justify-center flex-col mx-5">
    <div className="w-full w-full md:w-2/3 lg:w-1/3 shadow-sm rounded-md p-16 md:mx-auto bg-white">
    <div className="mb-6">

    <h1 className="text-3xl">{title}</h1>
          
          <h2 className="block text-gray-800 mb-2 text-md">
          {text}
          <Link to={to} className="ml-2 text-primary hover:underline">
            {linkText}
          </Link>
          </h2>
    </div>
    {children}
    </div>
    </div>
  )
};

export default AuthLayout;
