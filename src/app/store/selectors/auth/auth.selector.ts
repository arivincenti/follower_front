import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.reducer";

const auth = (state: AppState) => state.auth;
export const user = createSelector(auth, (auth) => auth.user);

export const logingIn = createSelector(auth, (auth) => auth.loading);

export const token = createSelector(auth, (auth) => auth.token);
