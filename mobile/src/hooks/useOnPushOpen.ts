import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import useTypedNavigation from "./useTypedNavigation";

export default () => {
    const navigation = useTypedNavigation<"Main">();
    useEffect(() => {
        messaging().onNotificationOpenedApp(async () => {
            try {
                // const order = await getOrder(orderUuid);
                // navigation.navigate("MyOrder", { item: order });
            } catch (e) {
                // console.log("ERROR ON FETCHING AN ORDER", e.response);
            }
        });
        messaging()
            .getInitialNotification()
            .then(async message => {
                if (message) {
                    const {} = message;
                    try {
                        // const order = await getOrder(orderUuid);
                        // navigation.navigate("MyOrder", { item: order });
                    } catch (e) {
                        // console.log("ERROR ON FETCHING AN ORDER", e.response);
                    }
                }
            });
    }, []);
};
