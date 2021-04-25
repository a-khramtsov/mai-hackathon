import axios from "axios";
import { Application, ParkingPlace, Resource } from "../types";

const URL_API = "http://api.svo.lapotnikov.ru/api/";

const instance = axios.create({
    withCredentials: true,
    timeout: 3000,
    baseURL: URL_API,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});

export const setToken = (token: string) => {
    instance.defaults.headers = { Authorization: "Bearer " + token };
};

const post = (url: string, params?: { [key: string]: unknown }) =>
    instance
        .post(url, params)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .then(({ data }) => data);

const get = (url: string, params?: { [key: string]: unknown }) =>
    instance
        .get(url, { params })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .then(({ data }) => data);

export const getToken = (credentials: {
    email: string;
    password: string;
}): Promise<{ access: string; refresh: string }> =>
    post("token/", credentials).then(
        d => d as { access: string; refresh: string },
    );

export const getApplications = () =>
    get("worker/applications/").then(r => r as Application[]);

export const createApplication = (
    application: Omit<
        Application,
        | "id"
        | "status"
        | "service_estimation"
        | "worker_estimation"
        | "resource_estimation"
    >,
) => post("worker/applications/", application);

export const getUser = () =>
    get("core/users/info/").then((data: { id: number }) => data.id);

export const getResources = () =>
    get("worker/resources/").then(r => r as Resource[]);

export const getParkingPlaces = () =>
    get("core/parking-places/").then(r => r as ParkingPlace[]);
