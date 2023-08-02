import React from "react";
import { Navigate } from "react-router-dom";
// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
function ProtectedRoute({ element: Component, ...props }) {
  return (
    props.loggedIn ? <Component {...props} replace /> : <Navigate to='/' replace />
  )
}

export default ProtectedRoute;