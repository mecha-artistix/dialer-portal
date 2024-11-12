// const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
//     const { isAuthenticated } = useAuthStore((state) => ({ isAuthenticated: state.isAuthenticated }));
//     // console.log('ProtectedRoute called');
//     // const jwtToken = getCookie('jwt');

//     // (async function () {
//     //   try {
//     //     const response = await verify();
//     //     return response;
//     //   } catch (error) {
//     //     return error;
//     //   }
//     // })();

//     // console.log(jwtToken);
//     // return jwtToken ? element : <Navigate to="/authentication/login" replace />;
//     return isAuthenticated ? element : <Navigate to="/authentication/login" replace />;
//   };
