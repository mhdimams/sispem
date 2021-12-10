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

export const SearchForm = types.model('SearchForm').props({
  startDate: types.optional(types.string, ''),
  endDate: types.optional(types.string, ''),
});

export const DataLaporan = types.model('DataLaporan').props({
  id: types.optional(types.number, 0),
  nama: types.optional(types.string, ''),
  tanggal_bayar: types.optional(types.string, ''),
  pembayaran: types.optional(types.number, 0),
  bulan: types.optional(types.string, ''),
});

export const LaporanPembayaranModel = types
  .model('LaporanPembayaran')
  .props({
    searchForm: types.optional(SearchForm, {}),
    dataList: types.optional(types.array(DataLaporan), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    handleStateGlobal(data: any) {
      applySnapshot(self, { ...self, ...data });
    },
    clearData() {
      applySnapshot(self, { ...self, searchForm: {}, dataList: [] });
    },
    handleStateForm(field: string, value: string | boolean | number) {
      applySnapshot(self, {
        ...self,
        searchForm: { ...self.searchForm, [field]: value },
      });
    },

    clearSearchForm() {
      applySnapshot(self, { ...self, searchForm: {} });
    },

    getLaporanPembayaran: flow(function* () {
      const { app } = getRoot(self);

      app.setLoading(true);
      const result = yield self.environment.PembayaranAPI.getLaporanPembayaran(
        self.searchForm.startDate,
        self.searchForm.endDate,
        app.token
      );

      app.setLoading(false);

      if (result.kind === 'ok') {
        self.dataList = result.data;
      } else {
        SwalError(result.message);
      }
    }),
  }));

export interface ISiswaModel extends Instance<typeof LaporanPembayaranModel> {}
type LaporanPembayaranType = Instance<typeof LaporanPembayaranModel>;
export interface ILaporanPembayaran extends LaporanPembayaranType {}
type LaporanPembayaranSnapshotType = SnapshotOut<typeof LaporanPembayaranModel>;
export interface LaporanPembayaranSnapshot
  extends LaporanPembayaranSnapshotType {}
export const createLaporanPembayaranDefaultModel = () =>
  types.optional(LaporanPembayaranModel, {});
