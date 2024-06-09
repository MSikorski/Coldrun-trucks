import { Module, ActionContext } from 'vuex';
import { get, post, put, del } from '@/lib/api';
import {
  ACTION_DELETE_TRUCK,
  MUTATION_SET_LOADING,
  ACTION_FETCH_TRUCKS,
  ACTION_UPDATE_PAGINATION,
  MUTATION_CLEAR_CREATE_TRUCK_FORM,
  MUTATION_CLEAR_UPDATE_TRUCK_FORM,
  MUTATION_SET_CREATE_TRUCK_FORM_ERROR,
  MUTATION_SET_CREATE_TRUCK_FORM_LOADING,
  MUTATION_SET_DELETE_DIALOG_VALUES,
  MUTATION_SET_PAGINATION,
  MUTATION_SET_TRUCKS,
  MUTATION_SET_UPDATE_TRUCK_FORM_ERROR,
  MUTATION_SET_UPDATE_TRUCK_FORM_LOADING,
  MUTATION_SET_UPDATE_TRUCK_FORM_VALUES,
  MUTATION_SET_UPDATE_TRUCK_FORM_VISIBLE,
} from "./constants";
import type { RootState } from '@/types';
import type { DeleteTruckDialog, Truck, TrucksState, UpdateTruckForm, Pagination } from './types';

const state: TrucksState = {
  trucksQuery: {
    code: '',
    name: '',
    description: '',
    status: '',
    sort: '',
    order: '',
    page: 0,
    limit: 10,
  },
  createTruckForm: {
    values: {
      code: '',
      name: '',
      description: '',
      status: null,
    },
    visible: false,
    submitted: false,
    error: null,
    loading: false,
  },
  updateTruckForm: {
    values: {
      id: 0,
      code: '',
      name: '',
      description: '',
      status: null,
      initialStatus: null,
    },
    visible: false,
    submitted: false,
    error: null,
    loading: false,
  },
  deleteTruckDialog: {
    id: 0,
    code: '',
    visible: false,
  },
  trucks: [],
  loading: false,
};

const getters = {
  trucksQuery: (state: TrucksState) => state.trucksQuery,
  createTruckForm: (state: TrucksState) => state.createTruckForm,
  updateTruckForm: (state: TrucksState) => state.updateTruckForm,
  deleteTruckDialog: (state: TrucksState) => state.deleteTruckDialog,
  isCreateTruckFormValid: (state: TrucksState) => {
    const { createTruckForm } = state;
    return createTruckForm.values.code && createTruckForm.values.name && createTruckForm.values.status;
  },
  isUpdateTruckFormValid: (state: TrucksState) => {
    const { updateTruckForm } = state;
    return updateTruckForm.values.code && updateTruckForm.values.name && updateTruckForm.values.status;
  },
  trucks: (state: TrucksState) => state.trucks,
  loading: (state: TrucksState) => state.loading,
};

const mutations = {
  [MUTATION_SET_TRUCKS]: (state: TrucksState, trucks: Truck[]) => state.trucks = trucks,
  [MUTATION_SET_LOADING]: (state: TrucksState, value: boolean) => state.loading = value,
  [MUTATION_SET_PAGINATION]: (state: TrucksState, pagination: Pagination) => {
    state.trucksQuery = {
      ...state.trucksQuery,
      ...pagination,
    };
  },

  [MUTATION_SET_CREATE_TRUCK_FORM_LOADING]: (state: TrucksState, value: boolean) => state.createTruckForm.loading = value,
  [MUTATION_SET_CREATE_TRUCK_FORM_ERROR]: (state: TrucksState, error: string | null) => state.createTruckForm.error = error,
  [MUTATION_CLEAR_CREATE_TRUCK_FORM]: (state: TrucksState) => {
    state.createTruckForm = {
      values: {
        code: '',
        name: '',
        description: '',
        status: null,
      },
      visible: false,
      submitted: false,
      error: null,
      loading: false,
    };
  },

  [MUTATION_SET_UPDATE_TRUCK_FORM_VISIBLE]: (state: TrucksState) => state.updateTruckForm.visible = true,
  [MUTATION_SET_UPDATE_TRUCK_FORM_VALUES]: (state: TrucksState, values: UpdateTruckForm) => {
    state.updateTruckForm.values = values;
  },
  [MUTATION_SET_UPDATE_TRUCK_FORM_LOADING]: (state: TrucksState, value: boolean) => state.createTruckForm.loading = value,
  [MUTATION_SET_UPDATE_TRUCK_FORM_ERROR]: (state: TrucksState, error: string | null) => state.createTruckForm.error = error,
  [MUTATION_CLEAR_UPDATE_TRUCK_FORM]: (state: TrucksState) => {
    state.updateTruckForm = {
      values: {
        id: 0,
        code: '',
        name: '',
        description: '',
        status: null,
        initialStatus: null,
      },
      visible: false,
      submitted: false,
      error: null,
      loading: false,
    };
  },

  [MUTATION_SET_DELETE_DIALOG_VALUES]: (state: TrucksState, value: DeleteTruckDialog) => state.deleteTruckDialog = value,
};

const actions = {

  [ACTION_FETCH_TRUCKS]: async ({ commit, dispatch }: ActionContext<TrucksState, RootState>): Promise<void> => {
    commit(MUTATION_SET_LOADING, true);
    const filteredQuery = Object.fromEntries(
        Object.entries(state.trucksQuery).filter(([_, value]) => value !== '' && value !== null)
    );
    const queryString = new URLSearchParams(filteredQuery);
    const trucks: Truck[] = await get(`trucks?${queryString}`);
    commit(MUTATION_SET_TRUCKS, trucks);
    commit(MUTATION_SET_LOADING, false);
  },

  [ACTION_UPDATE_PAGINATION]: async ({ commit, dispatch }: ActionContext<TrucksState, RootState>, pagination: Pagination): Promise<void> => {
    commit(MUTATION_SET_PAGINATION, pagination);
    await dispatch(ACTION_FETCH_TRUCKS);
  },

  async createTruck({ commit, dispatch }: ActionContext<TrucksState, RootState>): Promise<void> {
    commit(MUTATION_SET_CREATE_TRUCK_FORM_LOADING, true);

    const { createTruckForm } = state;
    const { values} = createTruckForm;
    const trucksWithCode = await get(`trucks?code=${values.code}`);
    if (trucksWithCode.length) {
      commit(MUTATION_SET_CREATE_TRUCK_FORM_ERROR, `Truck with code ${values.code} already exists.`);
      commit(MUTATION_SET_CREATE_TRUCK_FORM_LOADING, false);
      return;
    }

    try {
      await post('trucks', {
        body: JSON.stringify(values),
      });
    } catch (e: any) {
      commit(MUTATION_SET_CREATE_TRUCK_FORM_ERROR, `Network error while creating truck: ${e.toString()}`);
      return;
    }

    commit(MUTATION_CLEAR_CREATE_TRUCK_FORM);
    await dispatch(ACTION_FETCH_TRUCKS);
  },

  showUpdateTruckModal({ commit }: ActionContext<TrucksState, RootState>, truck: Truck) {
    commit(MUTATION_SET_UPDATE_TRUCK_FORM_VALUES, {
      ...truck,
      initialStatus: truck.status,
    });
    commit(MUTATION_SET_UPDATE_TRUCK_FORM_VISIBLE);
  },

  async updateTruck({ commit, dispatch }: ActionContext<TrucksState, RootState>): Promise<void> {
    commit(MUTATION_SET_UPDATE_TRUCK_FORM_LOADING, true);

    const { updateTruckForm } = state;
    const { values} = updateTruckForm;
    const value = {
      code: values.code,
      name: values.name,
      description: values.description,
      status: values.status,
    };
    try {
      await put(`trucks/${values.id}`, {
        body: JSON.stringify(value),
      });
    } catch (e: any) {
      commit(MUTATION_SET_UPDATE_TRUCK_FORM_ERROR, `Network error while creating truck: ${e.toString()}`);
      return;
    }

    commit(MUTATION_CLEAR_UPDATE_TRUCK_FORM);
    await dispatch(ACTION_FETCH_TRUCKS);
  },

  showDeleteTruckDialog({ commit }: ActionContext<TrucksState, RootState>, truck: Truck) {
    const value = {
      id: truck.id,
      code: truck.code,
      visible: true,
    };
    commit(MUTATION_SET_DELETE_DIALOG_VALUES, value);
  },

  [ACTION_DELETE_TRUCK]: async ({ commit, dispatch }: ActionContext<TrucksState, RootState>) => {
    const { id } = state.deleteTruckDialog;
    try {
      await del(`trucks/${id}`);
    } catch (e: any) {
      // no time to implement every case, enough already for a test project
    }
    commit(MUTATION_SET_DELETE_DIALOG_VALUES, {
      id: 0,
      code: '',
      visible: false,
    });
    await dispatch(ACTION_FETCH_TRUCKS);
  },
};

const trucks: Module<TrucksState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default trucks;
