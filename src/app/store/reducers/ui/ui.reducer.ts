import { createReducer, on, Action } from '@ngrx/store';
import * as UiActions from '../../actions/ui/ui.actions';

export interface UiState
{
  organizationModal: boolean,
}

export const initialState: UiState = {
  organizationModal: false
}

export const uiReducer = createReducer(
  initialState,
  on(UiActions.showOrganizationModal, (state) => (
    {
      ...state,
      organizationModal: true
    }
  )),
  on(UiActions.clearState, (state) => (
    {
      ...state,
      ...initialState
    }
  ))
)

export function UiReducer(state: UiState | undefined, action: Action)
{
  return uiReducer(state, action);
}