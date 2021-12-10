import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import * as Types from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { POST_LOGIN } from './API';

export class AuthAPI {
  config: ApiConfig;
  url;
  urlLogin;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.url = config.url;
    this.urlLogin = config.urlLogin;
  }

  public async requestToken(body: {
    username: string;
    password: string;
  }): Promise<Types.RequestTokenResult> {
    try {
      const result = await POST_LOGIN(this.urlLogin, body);

      if (result.status !== 200) {
        const problem = getGeneralApiProblem(result.status, result.res);
        if (problem) return problem;
      }

      return { kind: 'ok', data: result.res.data, message: '' };
    } catch (error) {
      return { kind: 'bad-data', message: 'Not expected format' };
    }
  }
}
