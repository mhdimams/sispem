import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import * as Types from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { POST, GET, PATCH } from './API';

export class SiswaAPI {
  config: ApiConfig;
  url;
  urlLogin;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.url = config.url;
    this.urlLogin = config.urlLogin;
  }

  public async getAll(): Promise<Types.RequestListSiswaResult> {
    try {
      const result = await GET(this.url + this.config.siswa.get);

      if (result.status !== 200) {
        const problem = getGeneralApiProblem(result.status, result.res);
        if (problem) return problem;
      }

      return { kind: 'ok', data: result.res.data, message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }
  public async getOneSiswa(id: number): Promise<Types.RequestListSiswaResult> {
    try {
      const result = await GET(this.url + this.config.siswa.getOne, { id });

      if (result.status !== 200) {
        const problem = getGeneralApiProblem(result.status, result.res);
        if (problem) return problem;
      }

      return { kind: 'ok', data: result.res.data, message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }

  public async createOneSiswa(form: any): Promise<Types.ResultNoData> {
    try {
      const result = await POST(this.url + this.config.siswa.create, {
        ...form,
      });
      if (result.status !== 200) {
        const problem = getGeneralApiProblem(result.status, result.res);
        if (problem) return problem;
      }

      return { kind: 'ok', data: '', message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }

  public async updateOneSiswa(
    form: any,
    id: number
  ): Promise<Types.ResultNoData> {
    try {
      const result = await PATCH(
        this.url + this.config.siswa.update?.replace(':id', id.toString()),
        {
          ...form,
        }
      );
      if (result.status !== 200) {
        const problem = getGeneralApiProblem(result.status, result.res);
        if (problem) return problem;
      }

      console.log(result);
      return { kind: 'ok', data: '', message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }

  public async deleteOneSiswa(id: number): Promise<Types.ResultNoData> {
    try {
      const result = await PATCH(
        this.url + this.config.siswa.delete?.replace(':id', id.toString()),
        {}
      );
      if (result.status !== 200) {
        const problem = getGeneralApiProblem(result.status, result.res);
        if (problem) return problem;
      }
      return { kind: 'ok', data: '', message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }
}
