import { GeneralApiProblem } from './api-problem';
import * as IntFace from '../../models/store';

interface RequestTiket {
  name: string;
  noTiket: number;
  status: boolean;
}

interface RequestToken {
  token: string;
  expiredIn: string;
}
interface DetailPembayaran {
  siswa: IntFace.Pembayaran.IDataSiswa;
  dataPembayaran: IntFace.Pembayaran.IPembayaranSiswa[];
}

export type ResultNoData =
  | { kind: 'ok'; data: ''; message: '' }
  | GeneralApiProblem;
export type RequestTiketResult =
  | { kind: 'ok'; data: RequestTiket[]; message: '' }
  | GeneralApiProblem;
export type RequestTokenResult =
  | { kind: 'ok'; data: RequestToken; message: '' }
  | GeneralApiProblem;
export type RequestListSiswaResult =
  | { kind: 'ok'; data: IntFace.Siswa.ISiswaModel[]; message: '' }
  | GeneralApiProblem;
export type RequestSiswaResult =
  | { kind: 'ok'; data: IntFace.Siswa.ISiswaModel; message: '' }
  | GeneralApiProblem;
export type RequestPembayaranSiswaResult =
  | { kind: 'ok'; data: DetailPembayaran; message: '' }
  | GeneralApiProblem;
