import React, { useEffect } from 'react';
import { Card, Space } from 'antd';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../models';
import { BlockUi } from '../../components';
import TablePembayaran from './table';
import Search from './search';

const Siswa = () => {
  const {
    app: { isLoading },
    pembayaran: { getMasterSiswa },
  } = useStores();

  useEffect(() => {
    getMasterSiswa();
  }, [getMasterSiswa]);

  return (
    <BlockUi isLoading={isLoading}>
      <Card title='Pembayaran'>
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <Search />
          <TablePembayaran />
        </Space>
      </Card>
    </BlockUi>
  );
};

export default observer(Siswa);
