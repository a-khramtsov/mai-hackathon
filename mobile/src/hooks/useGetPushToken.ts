import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { sendFCMToken } from "../util/api";

export default () => {
    useEffect(() => {
        messaging()
            .getToken()
            .then(i => {
                sendFCMToken(i);
                console.log(i);
            })
            .catch(() => {
                return;
            });

        messaging()
            .requestPermission()
            .catch(() => {
                return;
            });

        return messaging().onTokenRefresh(sendFCMToken);
    }, []);
};
