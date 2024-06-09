import {
  AT_JOB_POSSIBLE_STATUS_CHANGE,
  LOADING_POSSIBLE_STATUS_CHANGE,
  OUT_OF_SERVICE_POSSIBLE_STATUS_CHANGE,
  RETURNING_POSSIBLE_STATUS_CHANGE,
  TO_JOB_POSSIBLE_STATUS_CHANGE,
  TRUCK_STATUS_TO_LABEL
} from "./constants";
import type { TruckStatus } from "./types";

export const calculatePossibleStatusChanges = (status: TruckStatus) => {
  let possibleStatusKeys: TruckStatus[];
  switch (status) {
    case 'LOADING':
      possibleStatusKeys = LOADING_POSSIBLE_STATUS_CHANGE;
      break;
    case 'TO_JOB':
      possibleStatusKeys = TO_JOB_POSSIBLE_STATUS_CHANGE;
      break;
    case 'AT_JOB':
      possibleStatusKeys = AT_JOB_POSSIBLE_STATUS_CHANGE;
      break;
    case 'RETURNING':
      possibleStatusKeys = RETURNING_POSSIBLE_STATUS_CHANGE;
      break;
    case 'OUT_OF_SERVICE':
      possibleStatusKeys = OUT_OF_SERVICE_POSSIBLE_STATUS_CHANGE;
      break;
    default:
      possibleStatusKeys = [];
  }

  const statusOptions = possibleStatusKeys.map((value) => {
    const label = TRUCK_STATUS_TO_LABEL[value];
    return { value, label };
  });

  return statusOptions;
};
