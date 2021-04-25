import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getApplications,
    getParkingPlaces,
    getResources,
    getUser,
    sendFCMToken,
    setToken,
} from "../api";
import { RootState } from "../reducers";
import {
    setApplications,
    setResources,
    setParkingPlaces,
} from "../reducers/app";
import messaging from "@react-native-firebase/messaging";
import { setUserId } from "../reducers/user";

export default () => {
    const { access } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const loadResources = () => {
        console.log("GETTING STAFF");
        getResources()
            .then(i => {
                dispatch(setResources(i));
            })
            .catch(e =>
                console.log(
                    "ERROR ON GETTING RESOURCES",
                    JSON.stringify(e.response, null, 2),
                ),
            );
    };

    const loadApplications = useCallback(() => {
        getApplications()
            .then(i => {
                dispatch(setApplications(i));
            })
            .catch(e =>
                console.log(
                    "ERROR ON GETTING APPLICATIONS",
                    JSON.stringify(e.response, null, 2),
                ),
            );
    }, [dispatch]);

    const loadParkingPlaces = useCallback(() => {
        getParkingPlaces()
            .then(i => dispatch(setParkingPlaces(i)))
            .catch(e =>
                console.log(
                    "ERROR ON GETTING PARKING PLACES",
                    JSON.stringify(e.response, null, 2),
                ),
            );
    }, [dispatch]);

    useEffect(() => {
        setToken(access);
        loadResources();
        loadApplications();
        loadParkingPlaces();
        messaging()
            .getToken()
            .then(i => {
                console.log(i);
                sendFCMToken(i)
                    .then(console.log)
                    .catch(() => {
                        return;
                    });
            })
            .catch(() => {
                return;
            });

        messaging()
            .requestPermission()
            .catch(() => {
                return;
            });

        getUser()
            .then(id => dispatch(setUserId(id)))
            .catch(e =>
                console.log(
                    "ERROR ON GETTING USER",
                    JSON.stringify(e.response, null, 2),
                ),
            );
        return messaging().onTokenRefresh(sendFCMToken);
    }, [access, dispatch]);
};
