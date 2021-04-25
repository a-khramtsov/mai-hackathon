import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    access: "",
    refresh: "",
    id: -1,
};

export const setAccessToken = createAction<string>("SET_ACCESS_TOKEN");
export const setTokens = createAction<{ access: string; refresh: string }>(
    "SET_TOKENS",
);

export const setUserId = createAction<number>("SET_USER_ID");

export default createReducer(initialState, builder =>
    builder
        .addCase(setTokens, (state, { payload }) => ({
            ...state,
            ...payload,
        }))
        .addCase(setAccessToken, (state, { payload }) => ({
            ...state,
            access: payload,
        }))
        .addCase(setUserId, (state, { payload }) => ({
            ...state,
            id: payload,
        })),
);
