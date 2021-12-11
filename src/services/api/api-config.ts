import { BASE_URL_LOGIN, BASE_URL } from '../../config/config';

interface Crud {
  get?: string;
  getOne?: string;
  delete?: string;
  create?: string;
  update?: string;
}
/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  urlLogin: string;
  url: string;
  todo: string;
  siswa: Crud;
  pembayaran: Crud;
  laporanPembayaran: string;
  downloadLaporan: string;
  downloadPembayaran: string;
  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  urlLogin: BASE_URL_LOGIN,
  url: BASE_URL,

  todo: '/todos/1',
  siswa: {
    get: '/siswa',
    getOne: '/siswa/findbynameorid',
    create: '/siswa',
    update: '/siswa/:id',
    delete: '/siswa/delete/:id',
  },
  pembayaran: {
    get: '/pembayaran/siswapertahun',
    update: '/pembayaran/transaksibayar',
  },
  laporanPembayaran: '/pembayaran/laporan-pembayaran',
  downloadLaporan: '/pembayaran/download-laporan',
  downloadPembayaran: '/pembayaran/invoice',

  timeout: 60000,
};
