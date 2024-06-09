export type TruckStatus = 'TO_JOB' | 'LOADING' | 'AT_JOB' | 'RETURNING' | 'OUT_OF_SERVICE';

export interface Truck {
    id: number;
    code: string;
    name: string;
    description?: string;
    status: TruckStatus
}

export type CreateTruck = Omit<Truck, 'id'>;
export type CreateTruckForm = Omit<CreateTruck, 'status'> & {
  status: TruckStatus | null,
};

export type UpdateTruck = Truck;
export type UpdateTruckForm = Omit<UpdateTruck, 'status'> & {
  status: TruckStatus | null,
  initialStatus?: TruckStatus | null,
};

export interface DeleteTruckDialog {
  id: number,
  code: string,
  visible: boolean,
}

export type TruckSortableColumn = 'code' | 'name' | 'status';

export interface Pagination {
  limit: number;
  page: number;
}

export interface TrucksQuery {
  code: string;
  name: string;
  description: string;
  status: string;
  sort: string;
  order: string;
  limit: number,
  page: number;
}

export interface Form<FormValues> {
  values: FormValues,
  visible: boolean,
  submitted: boolean,
  error: string | null,
  loading: boolean,
}

export interface TrucksState {
  trucksQuery: TrucksQuery;
  createTruckForm: Form<CreateTruckForm>;
  updateTruckForm: Form<UpdateTruckForm>;
  deleteTruckDialog: DeleteTruckDialog;
  trucks: Truck[];
  loading: boolean,
}
