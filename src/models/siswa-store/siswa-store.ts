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

export const SiswaModel = types.model('SiswaModel').props({
  nama: types.optional(types.string, ''),
  alamat: types.optional(types.string, ''),
  umur: types.optional(types.number, 0),
  nomor_handphone: types.optional(types.string, ''),
  tanggal_masuk: types.optional(types.string, ''),
  id: types.optional(types.number, 0),
});

export const SiswaStoreModel = types
  .model('SiswaStore')
  .props({
    form: types.optional(SiswaModel, {}),
    dataList: types.optional(types.array(SiswaModel), []),
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
    clearData() {
      applySnapshot(self, { ...self, form: {}, dataList: [] });
    },
    getListSiswa: flow(function* () {
      const { app } = getRoot(self);

      app.setLoading(true);
      const result = yield self.environment.SiswaAPI.getAll();
      app.setLoading(false);

      if (result.kind === 'ok') {
        self.dataList = result.data;
      } else {
        SwalError(result.message);
      }
    }),

    getOneSiswa: flow(function* (id: number) {
      const { app } = getRoot(self);

      app.setLoading(true);
      const result = yield self.environment.SiswaAPI.getOneSiswa(id);
      app.setLoading(false);

      if (result.kind === 'ok') {
        self.form = result.data;
      } else {
        SwalError(result.message);
      }
    }),

    updateOrCreate: flow(function* () {
      let result: any;

      if (!self.form.id) {
        result = yield self.environment.SiswaAPI.createOneSiswa({
          ...self.form,
          id: undefined,
        });
      } else {
        result = yield self.environment.SiswaAPI.updateOneSiswa(
          { ...self.form, id: undefined },
          self.form.id
        );
      }

      if (result?.kind === 'ok') {
        return true;
      }

      return false;
    }),

    deleteOne: flow(function* (id: number) {
      const { app } = getRoot(self);

      app.setLoading(true);
      const result = yield self.environment.SiswaAPI.deleteOneSiswa(id);
      app.setLoading(false);

      if (result.kind === 'ok') {
        return true;
      } else {
        return false;
      }
    }),
  }));

export interface ISiswaModel extends Instance<typeof SiswaStoreModel> {}
type SiswaStoreType = Instance<typeof SiswaStoreModel>;
export interface SiswaStore extends SiswaStoreType {}
type SiswaStoreSnapshotType = SnapshotOut<typeof SiswaStoreModel>;
export interface SiswaStoreSnapshot extends SiswaStoreSnapshotType {}
export const createSiswaStoreDefaultModel = () =>
  types.optional(SiswaStoreModel, {});
