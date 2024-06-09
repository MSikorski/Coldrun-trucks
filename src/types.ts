import type { TrucksState } from '@/modules/Truck/types';

export type ISort = 'asc' | 'desc';

export interface RootState {
  trucks: TrucksState;
}
