import { createAction, createReducer } from "@reduxjs/toolkit";
import { Application, ParkingPlace, Resource } from "../types";

interface IInitialState {
    applications: Application[];
    resources: Resource[];
    snackBar: string;
    parkingPlaces: ParkingPlace[];
}

const initialState: IInitialState = {
    applications: [],
    resources: [],
    snackBar: "",
    parkingPlaces: [],
};

export const setApplications = createAction<Application[]>("SET_APPLICATIONS");
export const setResources = createAction<Resource[]>("SET_RESOURCES");
export const setSnackBar = createAction<string>("SET_SNACKBAR");
export const setParkingPlaces = createAction<ParkingPlace[]>(
    "SET_PARKING_PLACES",
);

export default createReducer(initialState, builder =>
    builder
        .addCase(setApplications, (state, { payload }) => ({
            ...state,
            applications: payload,
        }))
        .addCase(setResources, (state, { payload }) => ({
            ...state,
            resources: payload,
        }))
        .addCase(setSnackBar, (state, { payload }) => ({
            ...state,
            snackBar: payload,
        }))
        .addCase(setParkingPlaces, (state, { payload }) => ({
            ...state,
            parkingPlaces: payload,
        })),
);
