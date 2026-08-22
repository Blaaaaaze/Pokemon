import type { RootState } from '../../store';
import { createSelector } from 'reselect';

export const selectSearch = (state: RootState) => state.controls.search;
export const selectType = (state: RootState) => state.controls.type;

export const selectControls = createSelector(
    (state: RootState) => state.controls,
    ({ search, type }) => ({ search, type })
);
