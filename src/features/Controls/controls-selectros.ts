import type { RootState } from '../../store';

export const selectSearch = (state: RootState) => state.controls.search;
export const selectType = (state: RootState) => state.controls.type;