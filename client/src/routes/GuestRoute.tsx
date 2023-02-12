// import React, { useEffect } from "react";
// import {
//   Route,
//   Redirect,
//   RouteProps,
//   RouteComponentProps,
// } from "react-router-dom";

// import useAuth from "auth/useAuth";

// interface GuestRouteProps extends RouteProps {
//   component:
//     | React.ComponentType<RouteComponentProps<any>>
//     | React.ComponentType<any>;
// }

// const GuestRoute = ({ component: Component, ...rest }: GuestRouteProps) => {
//   const { loggedIn, loading } = useAuth();

//   useEffect(() => {}, [loggedIn]);

//   return !loading ? (
//     <Route
//       {...rest}
//       render={(props) => {
//         return !loggedIn ? <Component {...props} /> : <Redirect to="/" />;
//       }}
//     />
//   ) : null;
// };

const GuestRoute = () => null;

export default GuestRoute;
