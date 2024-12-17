import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
      return  <div className="flex items-center justify-center my-44">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>
      </div>
    }

    if(user?.email){
        return children;
    }

    return <Navigate to='/signIn' state={location.pathname}></Navigate>

};

export default PrivateRoute;