import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import * as Types from './api.types';
import { getGeneralApiProblem } from './api-problem';
import * as Interface from '../../models/store';
import { GET, HeaderAuth, POST, POST_DOWNLOAD } from './API';

export class PembayaranAPI {
  config: ApiConfig;
  url;
  urlLogin;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.url = config.url;
    this.urlLogin = config.urlLogin;
  }

  public async getPembayaranSiswa(
    siswa_id: number,
    tahun: number
  ): Promise<Types.RequestPembayaranSiswaResult> {
    try {
      const result = await GET(this.url + this.config.pembayaran.get, {
        siswa_id,
        tahun,
      });

      if (result.status !== 200) {
        const problem = getGeneralApiProblem(result.status, result.res);
        if (problem) return problem;
      }

      return { kind: 'ok', data: result.res.data, message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }

  public async transaksiBayar(
    body: Interface.Pembayaran.ITransaksiBayar,
    token: string
  ) {
    try {
      const result = await POST(
        this.url + this.config.pembayaran.update,
        body,
        HeaderAuth(token)
      );

      if (result.status !== 200) {
        const problem = getGeneralApiProblem(result.status, result.res);
        if (problem) return problem;
      }

      return { kind: 'ok', data: result.res.data, message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }

  public async getLaporanPembayaran(
    startDate: string,
    endDate: string,
    token: string
  ) {
    try {
      const result = await POST(
        this.url + this.config.laporanPembayaran,
        { startDate, endDate },
        HeaderAuth(token)
      );

      if (result.status !== 200) {
        const problem = getGeneralApiProblem(result.status, result.res);
        if (problem) return problem;
      }

      return { kind: 'ok', data: result.res.data, message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }

  public async getDownload(data: any, token: string) {
    try {
      await POST_DOWNLOAD(
        this.url + this.config.downloadPembayaran,
        { ...data },
        HeaderAuth(token)
      );

      // if (result.status && result.status !== 200) {
      //   const problem = getGeneralApiProblem(result.status, {
      //     message: 'Failed to Download',
      //   });
      //   if (problem) return problem;
      // }

      return { kind: 'ok', message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }

  public async getDownloadExcel(data: any, token: string) {
    try {
      await POST_DOWNLOAD(
        this.url + this.config.downloadLaporan,
        { ...data },
        HeaderAuth(token)
      );

      // if (result.status && result.status !== 200) {
      //   const problem = getGeneralApiProblem(result.status, {
      //     message: 'Failed to Download',
      //   });
      //   if (problem) return problem;
      // }

      return { kind: 'ok', message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }
}
