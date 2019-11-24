import { createReducer, on, Action } from '@ngrx/store';
import * as UiActions from '../../actions/ui/ui.actions';

export interface UiState
{
  toggledMenu: boolean,
  areaModal: boolean,
  animated: string[]
}

export const initialState: UiState = {
  toggledMenu: true,
  areaModal: false,
  animated: ['fadeInUp faster', 'bounceInRight faster', 'jello', 'fadeIn faster']
}

export const uiReducer = createReducer(
  initialState,
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