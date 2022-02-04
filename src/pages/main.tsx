import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from '../components';
import { FormLoader } from '../components/Loader';

/**Siswa */
const Siswa = lazy(() => import('./Siswa'));
const Pembayaran = lazy(() => import('./Pembayaran'));
const LaporanPembayaran = lazy(() => import('./LaporanPembayaran'));
const MyProfile = lazy(() => import('./MyProfile'));

const Main = () => {
  return (
    <Switch>
      <Layout>
        <Suspense fallback={<FormLoader />}>
          <Route exact path='/' component={Siswa} />
          <Route exact path='/my-profile' component={MyProfile} />
          <Route exact path='/pembayaran' component={Pembayaran} />
          <Route exact path='/view-report' component={LaporanPembayaran} />
        </Suspense>
      </Layout>
    </Switch>
  );
};

export default Main;
