import React, { useEffect } from 'react';
import { Card, Space } from 'antd';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../models';
import { BlockUi } from '../../components';
import TablePembayaran from './table';
import Search from './search';

const LaporanPembayaran = () => {
  const {
    app: { isLoading },
    pembayaran: { getMasterSiswa },
  } = useStores();

  useEffect(() => {
    getMasterSiswa();
  }, [getMasterSiswa]);

  return (
    <BlockUi isLoading={isLoading}>
      <Card title='Laporan Pembayaran'>
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <Search />
          <TablePembayaran />
        </Space>
      </Card>
    </BlockUi>
  );
};

export default observer(LaporanPembayaran);
