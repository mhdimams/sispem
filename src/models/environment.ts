import * as api from '../services/api';
export class Environment {
  constructor() {
    this.AuthAPI = new api.AuthAPI();
    this.SiswaAPI = new api.SiswaAPI();
    this.PembayaranAPI = new api.PembayaranAPI();
  }

  AuthAPI: api.AuthAPI;
  SiswaAPI: api.SiswaAPI;
  PembayaranAPI: api.PembayaranAPI;
}
