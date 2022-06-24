import { Subject } from 'rxjs';

const subjectChainId = new Subject<string>();
const subjectAddressId = new Subject<string>();

export const dataService = {
  setChainData: (val: string) => subjectChainId.next(val),
  clearChainData: () => subjectChainId.next(null),
  getChainData: () => subjectChainId.asObservable(),
  setAddressData: (val: string) => subjectAddressId.next(val),
  clearAddressData: () => subjectAddressId.next(null),
  getAddressData: () => subjectAddressId.asObservable()
};
