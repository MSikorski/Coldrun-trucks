import { createStore, Store } from 'vuex';
import trucks from '@/modules/Truck/store';
import type { RootState } from "./types";

const store: Store<RootState> = createStore({
  modules: {
    trucks,
  },
});

export default store;
