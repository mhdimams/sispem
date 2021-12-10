import {
  Instance,
  SnapshotOut,
  types,
  applySnapshot,
  flow,
} from 'mobx-state-tree';
import { SwalError } from '../../utils/sweetalert';

import { withEnvironment } from '../extensions/with-environment';

import Cookie from 'universal-cookie';
const cookie = new Cookie();

export const FormLoginModel = types.model('FormLogin').props({
  username: types.optional(types.string, ''),
  password: types.optional(types.string, ''),
});
export const AppStoreModel = types
  .model('AppStore')
  .props({
    formLogin: types.optional(FormLoginModel, {}),
    isLoading: types.optional(types.boolean, false),
    isError: types.optional(types.boolean, false),
    msgError: types.optional(types.string, ''),
    keyMenu: types.optional(types.string, '1'),
    keySubMenu: types.optional(types.string, ''),
    token: types.optional(types.string, ''),
    userId: types.optional(types.string, ''),
    nama: types.optional(types.string, ''),
    selectedTab: types.optional(types.string, ''),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setLoading(value: boolean) {
      self.isLoading = value;
    },
    handleStateForm(field: string, value: string | boolean | number) {
      applySnapshot(self, {
        ...self,
        formLogin: { ...self.formLogin, [field]: value },
      });
    },
    clearStateForm() {
      applySnapshot(self, { ...self, formLogin: {} });
    },
    handleStateGlobal(data: any) {
      applySnapshot(self, { ...self, ...data });
    },
    handleState(field: string, value: string | boolean | number) {
      applySnapshot(self, { ...self, [field]: value });
    },

    requestToken: flow(function* () {
      self.isLoading = true;

      const result = yield self.environment.AuthAPI.requestToken(
        self.formLogin
      );

      self.isLoading = false;

      if (result.kind === 'ok') {
        self.token = result.data.token;
        return true;
      } else {
        SwalError('Authentikasi Gagal');
        return false;
      }
    }),
    logout() {
      cookie.remove('PEMTOKEN');
      self.token = '';
    },
  }));

type AppStoreType = Instance<typeof AppStoreModel>;
export interface AppStore extends AppStoreType {}
type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>;
export interface AppStoreSnapshot extends AppStoreSnapshotType {}
export const createAppStoreDefaultModel = () =>
  types.optional(AppStoreModel, {});
