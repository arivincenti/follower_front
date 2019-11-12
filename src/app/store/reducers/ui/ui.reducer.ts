import { createReducer, on, Action } from '@ngrx/store';
import * as UiActions from '../../actions/ui/ui.actions';

export interface UiState
{
  organizationModal: boolean,
  animated: string[]
}

export const initialState: UiState = {
  organizationModal: false,
  animated: ['fadeInRight faster', 'bounceInRight faster', 'jello']
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