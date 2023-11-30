import React from 'react';
import { JsonError } from '../../Lottie/LottieImg';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
      <div className="flex flex-col justify-center h-screen items-center">
        <div className="w-1/3 text-center ">
          <JsonError></JsonError>
          <h1 className="text-3xl py-6 font-semibold text-center">
            Page Not <span className="text-red-500">Found</span>
          </h1>
          <Link  to="/">
            <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    );
};

export default Error;