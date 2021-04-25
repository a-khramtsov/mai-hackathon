import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

export default () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(message =>
            Alert.alert("NEW PUSH", JSON.stringify(message, null, 2)),
        );
        return unsubscribe;
    }, []);
};
