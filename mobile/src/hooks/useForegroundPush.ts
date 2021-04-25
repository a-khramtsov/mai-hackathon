import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

export default () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(message =>
            Alert.alert("Изменение статуса заявки", message.notification.body),
        );
        return unsubscribe;
    }, []);
};
