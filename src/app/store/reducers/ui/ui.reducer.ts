import { createReducer, on, Action } from '@ngrx/store';
import * as UiActions from '../../actions/ui/ui.actions';

export interface UiState
{
  organizationModal: boolean,
  areaModal: boolean,
  animated: string[]
}

export const initialState: UiState = {
  organizationModal: false,
  areaModal: false,
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
  on(UiActions.showAreaModal, (state) => (
    {
      ...state,
      areaModal: true
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