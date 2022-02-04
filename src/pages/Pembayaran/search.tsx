import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Collapse, Button, Form, Row, Col } from 'antd';

import { useStores } from '../../models';
import * as Comp from '../../components';

const SearchPembayaran = () => {
  const {
    app: { token },
    pembayaran: {
      masterSiswa,
      handleStateSearch,
      getDataPembayaran,
      downloadPembayaran,
    },
  } = useStores();
  const [form] = Form.useForm();

  const onSearch = useCallback(async () => {
    await form.validateFields();
    await getDataPembayaran();
  }, [getDataPembayaran, form]);

  const onDownloadLaporanPembayaran = useCallback(async () => {
    await form.validateFields();

    await downloadPembayaran();
  }, [form, downloadPembayaran]);

  return (
    <Collapse collapsible='header' defaultActiveKey={['1']}>
      <Collapse.Panel header='Search Pembayaran Siswa' key='1'>
        <Form
          form={form}
          labelAlign='left'
          layout='vertical'
          onFinish={onSearch}
        >
          <Row gutter={24}>
            <Col xs={18} lg={18}>
              <Form.Item
                name='namasiswa'
                label='Nama Siswa'
                rules={[{ required: true }]}
              >
                <Comp.Antd.Select
                  showSearch={true}
                  source={masterSiswa}
                  onChange={(value) =>
                    handleStateSearch('siswa_id', parseInt(value))
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={6} lg={6}>
              <Form.Item
                name='tahun'
                label='Tahun'
                rules={[{ required: true }]}
              >
                <Comp.Antd.DatePicker
                  picker='year'
                  style={{ width: '100%' }}
                  onChange={(date, dateString) =>
                    handleStateSearch('tahun', parseInt(dateString))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {token && (
              <Button
                type='ghost'
                size='middle'
                style={{ marginRight: '0.5rem' }}
                onClick={onDownloadLaporanPembayaran}
              >
                Download Laporan Pembayaran
              </Button>
            )}
            <Button type='primary' size='middle' htmlType='submit'>
              Cari Data Pembayaran
            </Button>
          </div>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};

export default observer(SearchPembayaran);
