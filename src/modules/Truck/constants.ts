import type { TruckSortableColumn, TruckStatus } from "./types";

export const MODULE_ID = 'trucks';

export const TRUCK_STATUS_TO_LABEL: Record<TruckStatus, string> = {
  LOADING: 'Loading',
  TO_JOB: 'To Job',
  AT_JOB: 'At job',
  RETURNING: 'Returning',
  OUT_OF_SERVICE: 'Out of Service',
};

export const LOADING_POSSIBLE_STATUS_CHANGE: TruckStatus[] = ['LOADING', 'TO_JOB', 'OUT_OF_SERVICE'];
export const TO_JOB_POSSIBLE_STATUS_CHANGE: TruckStatus[] = ['TO_JOB', 'AT_JOB', 'OUT_OF_SERVICE'];
export const AT_JOB_POSSIBLE_STATUS_CHANGE: TruckStatus[] = ['AT_JOB', 'RETURNING', 'OUT_OF_SERVICE'];
export const RETURNING_POSSIBLE_STATUS_CHANGE: TruckStatus[] = ['RETURNING', 'LOADING', 'OUT_OF_SERVICE'];
export const OUT_OF_SERVICE_POSSIBLE_STATUS_CHANGE: TruckStatus[] = Object.keys(TRUCK_STATUS_TO_LABEL) as TruckStatus[];

export const TRUCK_SORTABLE_COLUMN_TO_LABEL: Record<TruckSortableColumn, string> = {
    code: 'Code',
    name: 'Name',
    status: 'Status',
};

// getters -------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------

// actions -------------------------------------------------------------------------------------------------------------
export const ACTION_FETCH_TRUCKS = 'fetchTrucks';
export const ACTION_UPDATE_PAGINATION = 'updatePagination';
export const ACTION_CREATE_TRUCK = 'createTruck';
export const ACTION_UPDATE_TRUCK = 'updateTruck';
export const ACTION_SHOW_UPDATE_TRUCK_DIALOG = 'showUpdateTruckModal';
export const ACTION_SHOW_DELETE_TRUCK_DIALOG = 'showDeleteTruckDialog';
export const ACTION_DELETE_TRUCK = 'deleteTruck';
// ---------------------------------------------------------------------------------------------------------------------

// mutations -----------------------------------------------------------------------------------------------------------
export const MUTATION_SET_TRUCKS = 'setTrucks';
export const MUTATION_SET_LOADING = 'setLoading';
export const MUTATION_SET_PAGINATION = 'setPagination';

export const MUTATION_SET_CREATE_TRUCK_FORM_ERROR = 'setCreateTruckFormError';
export const MUTATION_SET_CREATE_TRUCK_FORM_LOADING = 'setCreateTruckFormLoading';
export const MUTATION_CLEAR_CREATE_TRUCK_FORM  = 'clearCreateTruckForm';

export const MUTATION_SET_UPDATE_TRUCK_FORM_VISIBLE = 'setUpdateTruckFormVisible';
export const MUTATION_SET_UPDATE_TRUCK_FORM_VALUES = 'setUpdateTruckFormValues';
export const MUTATION_SET_UPDATE_TRUCK_FORM_ERROR = 'setUpdateTruckFormError';
export const MUTATION_SET_UPDATE_TRUCK_FORM_LOADING = 'setUpdateTruckFormLoading';
export const MUTATION_CLEAR_UPDATE_TRUCK_FORM  = 'clearUpdateTruckForm';

export const MUTATION_SET_DELETE_DIALOG_VALUES = 'setDeleteTruckDialogValues';
// ---------------------------------------------------------------------------------------------------------------------
