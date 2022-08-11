import { useCallback, useContext, useEffect, useState } from "react";

import Loading from "./Loading";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
const [loading, setLoading] = useState('')
  //   const changeLoading = () => setLoading(() => false);
  //   useEffect(() => {
  // if(user){
  //   setLoading(false)
  // }else{setLoading(false)}
  //   }, [user]);

  // console.log("loading: ", loading);
  return (
    <div className="protected-route">
      {loading ? (
        <Loading />
      ) : 'user' ? (
        children
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </div>
  );
};

export default ProtectedRoute;
