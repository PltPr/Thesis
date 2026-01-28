import { useAuth } from 'Context/useAuth';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

type Props = {children:React.ReactNode}

export const ProtectedRoutes = ({children}: Props) => {
    const location = useLocation();
    const {isAdmin,isExaminer}=useAuth();
  return (isAdmin()||isExaminer()) ? 
  (<>{children}</>)
  :
  (<Navigate to="/" state={{from:location}} replace/>)
  
}

export const AdminProtectedRoutes = ({ children }: Props) => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  return isAdmin() ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

