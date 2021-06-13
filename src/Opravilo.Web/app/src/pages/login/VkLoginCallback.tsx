import * as React from "react";
import {FC} from "react";
import { useLocation, useHistory } from "react-router-dom";
import {Client} from "../../api/client";
import AuthManager from "../../auth/AuthManager";

const VkLoginCallback: FC = () => {
    const location = useLocation();
    const history = useHistory();
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    console.log("code from component:");
    console.log(code);
    
    const client = new Client();
    client
        .loginVK(code)
        .then((res) => {
            if (!res.isSuccess) {
                history.push("/");
            }
            else {
                AuthManager.setTokens(res.token, res.refreshToken);
                history.push("/home");
            } 
        });
    
    return <h1>Lol</h1>
};

export default VkLoginCallback;