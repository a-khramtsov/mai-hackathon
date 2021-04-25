import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";

export default () => {
    const navigation = useNavigation();
    useEffect(() => {
        messaging().onNotificationOpenedApp(data => {
            navigation.navigate("Home", { screen: "ApplicationHistory" });
            // console.log(JSON.stringify(data));
            // const order = await getOrder(orderUuid);
            // navigation.navigate("MyOrder", { item: order });
            // console.log("ERROR ON FETCHING AN ORDER", e.response);
        });
        messaging()
            .getInitialNotification()
            .then(message => {
                if (message) {
                    // const {} = message;

                    navigation.navigate("Home", {
                        screen: "ApplicationHistory",
                    });
                    console.log(JSON.stringify(messaging));

                    // const order = await getOrder(orderUuid);
                    // navigation.navigate("MyOrder", { item: order });
                    // console.log("ERROR ON FETCHING AN ORDER", e.response);
                }
            })
            .catch(() => {
                return;
            });
    }, []);
};
