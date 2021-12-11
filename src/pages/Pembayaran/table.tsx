import React, { useState, useCallback } from 'react';
import { Collapse, Space, Button, Table, Typography } from 'antd';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import FormPembayaran from './form';
import { useStores } from '../../models';

const { Title, Text } = Typography;
const TableSiswa = () => {
  const {
    app: { token },
    pembayaran: {
      siswa,
      dataPembayaran,
      search,
      handleStateGlobal,
      getDownload,
    },
  } = useStores();
  const [visible, setVisible] = useState(false);

  const onClickButton = useCallback(
    (row: any) => {
      if (row.status !== 'Lunas') {
        setVisible(true);
        handleStateGlobal({
          transaksiBayar: {
            siswa_id: search.siswa_id,
            bulan: row.bulan,
            tahun: search.tahun,
            tanggal_bayar: moment().format('YYYY-MM-DD HH:mm:ss'),
            month: row.month,
          },
        });
      } else {
        getDownload(row.bulan);
      }
    },
    [handleStateGlobal, setVisible, search, getDownload]
  );

  const columns = () => {
    return [
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
        dataIndex: 'month',
        key: 'month',
      },
      {
        title: 'Pembayaran',
        dataIndex: 'pembayaran',
        key: 'pembayaran',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },

      token !== ''
        ? {
            title: 'Proces Bayar',
            dataIndex: 'action',
            key: 'action',
            render: (text: string, row: any) => {
              const disabled =
                moment(siswa.tanggal_masuk, 'YYYY-MM-DD').subtract(
                  1,
                  'months'
                ) > moment(`${search.tahun}-${row.bulan}-01`, 'YYYY-M-DD');

              return (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => onClickButton(row)}
                    disabled={disabled}
                  >
                    {row.tanggal_bayar ? 'Download' : 'Bayar'}
                  </Button>
                </div>
              );
            },
          }
        : {},
    ];
  };

  return (
    <>
      <FormPembayaran visible={visible} setVisible={setVisible} />
      <Collapse collapsible='header' defaultActiveKey={['1']}>
        <Collapse.Panel header='Table Siswa' key='1'>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Space
              direction='horizontal'
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              align='start'
            >
              <div className='info-siswa'>
                {siswa.nama && <Title level={5}>Nama : {siswa.nama}</Title>}
                {siswa?.tanggal_masuk && (
                  <Text>
                    Bergabung sejak,{' '}
                    {moment(siswa.tanggal_masuk).format('DD MMMM YYYY')}
                  </Text>
                )}
              </div>
              {siswa.nama && (
                <div className='price-siswa'>
                  <Title level={5}>Tagihan Rp. 60000</Title>
                </div>
              )}
            </Space>
            <Table
              columns={columns()}
              dataSource={dataPembayaran.slice()}
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
