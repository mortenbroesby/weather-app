import { $store } from ".";
import { Module } from "vuex";

export interface ModuleDispatcher<S, R, A> extends Module<S, R> {
  dispatch(action: keyof A, payload?: any): Promise<any>;
}

export function createDispatcher<T>(namespace: string) {
  const dispatch = (action: keyof T, payload?: any) => {
    return $store.dispatch(`${namespace}/${action}` as any, payload);
  };

  return dispatch;
}
