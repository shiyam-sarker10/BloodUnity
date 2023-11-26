import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useUserInfo from '../../../hooks/useUserInfo';


const DashboardWelcome = () => {

  
    const {user} = useAuth()
    const [UserInfo] = useUserInfo()
    return ( 
      <div className=" w-full  flex justify-center items-center">
        <div className="text-4xl">
          Welcome Back,<span className="text-red-600">{UserInfo?.name}</span>
        </div>
      </div>
    );
};

export default DashboardWelcome;