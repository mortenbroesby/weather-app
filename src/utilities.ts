import config from "./config";
import Logger from "js-logger";

/**
 * [ Storage utility function ]

 Advantages:
  - version control (migration of data possible)
  - no need to JSON.stringify/parse data
  - saves with environment in storage-key (prevent cross-environment pollution)
 */

interface StorageItem {
  type: string;
  data: string;
  version: number;
}

const STORAGE_PREFIX = `${config.environment}-`;
const STORAGE_CURRENT_VERSION = 1;

export function setItem(keyName: string, keyValue: any): void {
  let dataToStore: StorageItem = {
    type: "string",
    data: "",
    version: STORAGE_CURRENT_VERSION
  };

  if (Array.isArray(keyValue)) {
    dataToStore.type = "array";
    dataToStore.data = JSON.stringify(keyValue);
  } else if (typeof keyValue === "object") {
    dataToStore.type = "object";
    dataToStore.data = JSON.stringify(keyValue);
  } else if (typeof keyValue === "boolean") {
    dataToStore.type = "boolean";
    dataToStore.data = JSON.stringify(keyValue);
  } else if (typeof keyValue === "number") {
    dataToStore.type = "number";
    dataToStore.data = `${keyValue}`;
  } else {
    dataToStore.type = "string";
    dataToStore.data = `${keyValue}`;
  }

  try {
    localStorage.setItem(`${STORAGE_PREFIX}-${keyName}`, JSON.stringify(dataToStore));
  } catch (error) {
    Logger.error("Local-storage: Error setting stored item: ", error);
  }
}

export function removeItem(keyName: string): any {
  const storageItem = localStorage.getItem(`${STORAGE_PREFIX}-${keyName}`);
  if (storageItem === undefined || storageItem === null) {
    return;
  }

  try {
    localStorage.removeItem(`${STORAGE_PREFIX}-${keyName}`);
  } catch (error) {
    Logger.error("Local-storage: Error clearing stored item: ", error);
  }
}

export function getItem(keyName: string): any {
  let returnedData: any = "";
  let storageItem: any = undefined;

  try {
    storageItem = localStorage.getItem(`${STORAGE_PREFIX}-${keyName}`);
  } catch (error) {
    Logger.error("Local-storage: Error retrieving stored item: ", error);
  }

  if (storageItem === undefined || storageItem === null) {
    return storageItem;
  } else {
    const storedData: StorageItem = JSON.parse(storageItem);

    // Guard against invalid storage format
    if (!storedData || typeof storedData.version !== "number") {
      Logger.error("Storage data has invalid format: ", storageItem);
    }

    // Guard against outdated stored content
    if (storedData.version === STORAGE_CURRENT_VERSION) {
      returnedData = parseStoredData(storedData);
    } else {
      returnedData = migrateStoredData(storedData);
    }
  }

  return returnedData;
}

function parseStoredData(storageItem: StorageItem) {
  if (storageItem.type === "array") {
    return JSON.parse(storageItem.data);
  } else if (storageItem.type === "object") {
    return JSON.parse(storageItem.data);
  } else if (storageItem.type === "boolean") {
    return Boolean(storageItem.data);
  } else if (storageItem.type === "number") {
    return Number(storageItem.data);
  } else if (storageItem.type === "string") {
    return String(storageItem.data);
  }
}

function migrateStoredData(storageItem: StorageItem) {
  // Reserved for future use, e.g. if you need to adjust data from one version to another.
  // Define old version, and what needs to migrate.

  if (storageItem.version === 1) {
    return parseStoredData(storageItem);
  }
}

/*************************************************/
/* UTILITY FUNCTIONS */
/*************************************************/
export function stringIsEmpty(string: string) {
  return (!string || 0 === string.length);
}
