import React from 'react';
import { Collapse, Space, Table, Typography } from 'antd';
import moment from 'moment';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../models';

const { Text } = Typography;
const TableSiswa = () => {
  const {
    laporanPembayaran: { dataList },
  } = useStores();

  const columns = () => {
    return [
      {
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
      },
      {
        title: 'Pembayaran',
        dataIndex: 'pembayaran',
        key: 'pembayaran',
      },
      {
        title: 'Tanggal Bayar',
        dataIndex: 'tanggal_bayar',
        key: 'tanggal_bayar',
        render: (text: string, row: any) => (
          <Text>{text ? moment(text).format('DD MMMM YYYY') : '-'}</Text>
        ),
      },
      {
        title: 'Bulan',
        dataIndex: 'bulan',
        key: 'bulan',
      },
    ];
  };

  return (
    <>
      <Collapse collapsible='header' defaultActiveKey={['1']}>
        <Collapse.Panel header='Table Laporan Pembayaran' key='1'>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Table
              columns={columns()}
              dataSource={dataList.slice()}
              pagination={{ pageSize: 50 }}
              rowKey={(row: any) => {
                return row.bulan;
              }}
            />
          </Space>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

export default observer(TableSiswa);
