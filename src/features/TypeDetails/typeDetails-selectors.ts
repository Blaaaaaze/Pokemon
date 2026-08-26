import type { RootState } from '../../store';

export const selectTypeData = (state: RootState) => state.typeDetails.currentType;
export const selectStatus = (state: RootState) => state.typeDetails.status;