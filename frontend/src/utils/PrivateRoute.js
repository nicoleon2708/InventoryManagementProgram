import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    console.log('private route work')
    return (
        <Route {...rest}>
            {children}
        </Route >
    )
}
export default PrivateRoute
