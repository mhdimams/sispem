import React, { useState, useCallback } from 'react';
import { Collapse, Space, Button, Table } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { useStores } from '../../models';

import FormSiswa from './form';

const TableSiswa = () => {
  const {
    siswa: { dataList },
  } = useStores();
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<null | number>(null);

  const onClickEdit = useCallback(
    (id: number) => {
      setVisible(true);
      setSelectedId(id);
    },
    [setVisible, setSelectedId]
  );

  const onClickAdd = useCallback(() => {
    setVisible(true);
    setSelectedId(null);
  }, [setSelectedId, setVisible]);

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      key: 'alamat',
    },
    {
      title: 'Umur',
      dataIndex: 'umur',
      key: 'umur',
    },
    {
      title: 'Nomor Handphone',
      dataIndex: 'nomor_handphone',
      key: 'nomor_handphone',
    },
    {
      title: 'Tanggal Masuk',
      dataIndex: 'tanggal_masuk',
      key: 'tanggal_masuk',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, row: any) => (
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => onClickEdit(row.id)}>
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <FormSiswa visible={visible} setVisible={setVisible} id={selectedId} />
      <Collapse collapsible='header' defaultActiveKey={['1']}>
        <Collapse.Panel header='Table Siswa' key='1'>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Button onClick={() => onClickAdd()}>
              <PlusCircleOutlined /> Add
            </Button>
            <Table
              columns={columns}
              dataSource={dataList.slice()}
              // scroll={{ x: 1700 }}
              pagination={{ pageSize: 50 }}
              rowKey={(row: any) => {
                return row.id;
              }}
            />
          </Space>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

export default TableSiswa;
