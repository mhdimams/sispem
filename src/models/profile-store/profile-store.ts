import {
  Instance,
  SnapshotOut,
  types,
  applySnapshot,
  flow,
  getRoot,
} from 'mobx-state-tree';
import { SwalError } from '../../utils/sweetalert';

import { withEnvironment } from '../extensions/with-environment';

export const FormUserModel = types.model('FormUserModel').props({
  oldPassword: types.optional(types.string, ''),
  newPassword: types.optional(types.string, ''),
  newPasswordConfirmation: types.optional(types.string, ''),
});

export const UserStoreModel = types
  .model('FormUserModel')
  .props({
    form: types.optional(FormUserModel, {}),
    name: types.optional(types.string, ''),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    handleStateGlobal(data: any) {
      applySnapshot(self, { ...self, ...data });
    },
    handleStateForm(field: string, value: string | boolean | number) {
      applySnapshot(self, { ...self, form: { ...self.form, [field]: value } });
    },
    clearForm() {
      applySnapshot(self, { ...self, form: {} });
    },
  }));

type UserProfileType = Instance<typeof UserStoreModel>;
export interface UserProfile extends UserProfileType {}
type UserProfileSnapshotType = SnapshotOut<typeof UserStoreModel>;
export interface UserProfileSnapshot extends UserProfileSnapshotType {}
export const createUserProfileDefaultModel = () =>
  types.optional(UserStoreModel, {});
