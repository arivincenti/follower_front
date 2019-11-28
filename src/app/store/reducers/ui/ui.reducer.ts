import { createReducer, on, Action } from '@ngrx/store';
import * as UiActions from '../../actions/ui/ui.actions';

export interface UiState
{
  theme: string,
  animated: string[]
}

export const initialState: UiState = {
  theme: 'default',
  animated: ['fadeInUp faster', 'bounceInRight faster', 'jello', 'fadeIn faster']
}

export const uiReducer = createReducer(
  initialState,
  on(UiActions.selectTheme, (state, {payload}) => (
    {
      ...state,
      theme: payload
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