// import {
//   Route,
//   Redirect,
//   RouteProps,
//   RouteComponentProps,
// } from "react-router-dom";

// import useAuth from "auth/useAuth";

// interface ProtectedRouteProps extends RouteProps {
//   component:
//     | React.ComponentType<RouteComponentProps<any>>
//     | React.ComponentType<any>;
// }

// const ProtectedRoute = ({
//   component: Component,
//   ...rest
// }: ProtectedRouteProps) => {
//   const { loggedIn, loading } = useAuth();

//   return !loading ? (
//     <Route
//       {...rest}
//       render={(props) => {
//         return loggedIn ? <Component {...props} /> : <Redirect to="/" />;
//       }}
//     />
//   ) : null;
// };

const ProtectedRoute = () => null;

export default ProtectedRoute;
