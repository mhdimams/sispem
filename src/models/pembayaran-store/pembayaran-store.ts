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

export const MasterSiswa = types.model('MasterSiswa').props({
  id: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
});

export const DataSiswa = types.model('DataSiswa').props({
  nama: types.optional(types.string, ''),
  alamat: types.optional(types.string, ''),
  umur: types.optional(types.number, 0),
  nomor_handphone: types.optional(types.string, ''),
  tanggal_masuk: types.optional(types.string, ''),
  id: types.optional(types.number, 0),
});

export const PembayaranSiswa = types.model('PembayaranSiswa').props({
  month: types.optional(types.string, ''),
  bulan: types.optional(types.number, 0),
  pembayaran: types.optional(types.number, 0),
  tanggal_bayar: types.maybeNull(types.string),
  status: types.optional(types.string, ''),
});

export const TransaksiBayar = types.model('TransaksiBayar').props({
  siswa_id: types.optional(types.number, 0),
  bulan: types.optional(types.number, 0),
  tahun: types.optional(types.number, 0),
  tanggal_bayar: types.optional(types.string, ''),
  month: types.optional(types.string, ''),
});
export const Search = types.model('Search').props({
  siswa_id: types.optional(types.number, 0),
  tahun: types.optional(types.number, 0),
});
export const PembayaranStoreModel = types
  .model('PembayaranStore')
  .props({
    masterSiswa: types.optional(types.array(MasterSiswa), []),
    siswa: types.optional(DataSiswa, {}),
    dataPembayaran: types.optional(types.array(PembayaranSiswa), []),
    transaksiBayar: types.optional(TransaksiBayar, {}),
    search: types.optional(Search, {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    handleStateGlobal(data: any) {
      applySnapshot(self, { ...self, ...data });
    },
    handleStateTransaksi(field: string, value: string | boolean | number) {
      applySnapshot(self, {
        ...self,
        transaksiBayar: { ...self.transaksiBayar, [field]: value },
      });
    },
    clearTransaksiBayar() {
      applySnapshot(self, { ...self, transaksiBayar: {} });
    },

    clearSearch() {
      applySnapshot(self, {
        ...self,
        search: {},
        dataPembayaran: [],
        siswa: {},
      });
    },
    handleStateSearch(field: string, value: string | boolean | number) {
      applySnapshot(self, {
        ...self,
        search: { ...self.search, [field]: value },
      });
    },
    getMasterSiswa: flow(function* () {
      const { app } = getRoot(self);

      app.setLoading(true);
      const result = yield self.environment.SiswaAPI.getAll();
      app.setLoading(false);

      if (result.kind === 'ok') {
        self.masterSiswa = result.data.map((item: any) => ({
          id: item.id.toString(),
          label: `${item.nama} - ${item.nis}`,
        }));
      } else {
        SwalError(result.message);
      }
    }),
    getDataPembayaran: flow(function* () {
      const { app } = getRoot(self);

      app.setLoading(true);
      const result = yield self.environment.PembayaranAPI.getPembayaranSiswa(
        self.search.siswa_id,
        self.search.tahun
      );
      app.setLoading(false);

      if (result.kind === 'ok') {
        const { dataPembayaran, siswa } = result.data;
        self.dataPembayaran = dataPembayaran;
        self.siswa = siswa;
      } else {
        SwalError(result.message);
      }
    }),
    updateTransaksiBayar: flow(function* () {
      const { app } = getRoot(self);

      app.setLoading(true);
      const result = yield self.environment.PembayaranAPI.transaksiBayar(
        self.transaksiBayar,
        app.token
      );
      app.setLoading(false);

      if (result.kind === 'ok') {
        return true;
      } else {
        return false;
      }
    }),
    getDownload: flow(function* (bulan: number) {
      const { app } = getRoot(self);

      app.setLoading(true);

      // const namaSiswa = self.siswa.nama.split(' ').join('_');
      // const filename = `Invoice_${namaSiswa}_${self.search.tahun}_${bulan}.pdf`;

      const result = yield self.environment.PembayaranAPI.getDownload(
        { siswa_id: self.siswa.id, tahun: self.search.tahun, bulan: bulan },
        app.token
      );

      app.setLoading(false);

      console.log(result);
      if (result.kind !== 'ok') {
        SwalError(result.message);
      }
    }),

    downloadPembayaran: flow(function* () {
      const { app } = getRoot(self);

      app.setLoading(true);

      const result =
        yield self.environment.PembayaranAPI.downloadPembayaranSiswaPertahun(
          {
            siswa_id: self.search.siswa_id,
            tahun: self.search.tahun,
          },
          app.token
        );

      app.setLoading(false);

      if (result.kind !== 'ok') {
        SwalError(result.message);
      }
    }),
  }));

export interface ITransaksiBayar extends Instance<typeof TransaksiBayar> {}

export interface IPembayaranSiswa extends Instance<typeof PembayaranSiswa> {}
export interface IDataSiswa extends Instance<typeof DataSiswa> {}
type PembayaranStoreType = Instance<typeof PembayaranStoreModel>;
export interface PembayaranStore extends PembayaranStoreType {}
type PembayaranStoreSnapshotType = SnapshotOut<typeof PembayaranStoreModel>;
export interface PembayaranStoreSnapshot extends PembayaranStoreSnapshotType {}
export const createPembayaranStoreDefaultModel = () =>
  types.optional(PembayaranStoreModel, {});
