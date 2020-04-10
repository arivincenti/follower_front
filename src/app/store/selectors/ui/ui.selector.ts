import { AppState } from "../../app.reducer";
import { createSelector } from "@ngrx/store";

const uiState = (state: AppState) => state.ui;

export const animation = createSelector(uiState, (uiState) => uiState.animated);
export const theme = createSelector(uiState, (uiState) => uiState.theme);
