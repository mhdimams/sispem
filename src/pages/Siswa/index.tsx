import React, { useEffect } from 'react';
import { Card } from 'antd';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../models';
import { BlockUi } from '../../components';
import TableSiswa from './table';

const Siswa = () => {
  const {
    app,
    siswa: { getListSiswa },
  } = useStores();

  useEffect(() => {
    getListSiswa();
  }, [getListSiswa]);
  return (
    <BlockUi isLoading={app.isLoading}>
      <Card title='Siswa'>
        <TableSiswa />
      </Card>
    </BlockUi>
  );
};

export default observer(Siswa);
