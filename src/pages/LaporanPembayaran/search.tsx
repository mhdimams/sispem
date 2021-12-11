import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Collapse, Button, Form, Row, Col } from 'antd';

import { useStores } from '../../models';
import * as Comp from '../../components';

const SearchPembayaran = () => {
  const {
    laporanPembayaran: {
      handleStateForm,
      getLaporanPembayaran,
      getDownload,
      searchForm: { startDate, endDate },
      clearSearchForm,
    },
  } = useStores();
  const [form] = Form.useForm();

  const onSearch = useCallback(async () => {
    await form.validateFields();
    await getLaporanPembayaran();
  }, [getLaporanPembayaran, form]);

  const onChangeDate = useCallback(
    (moment, dateString) => {
      handleStateForm('startDate', dateString[0]);
      handleStateForm('endDate', dateString[1]);
    },
    [handleStateForm]
  );

  const onDownloadExcel = useCallback(() => {
    getDownload();
  }, [getDownload]);

  const onClear = useCallback(() => {
    clearSearchForm();
    form.resetFields();
  }, [clearSearchForm, form]);
  return (
    <Collapse collapsible='header' defaultActiveKey={['1']}>
      <Collapse.Panel header='Search Laporan Pembayaran' key='1'>
        <Form
          form={form}
          labelAlign='left'
          layout='vertical'
          onFinish={onSearch}
        >
          <Row gutter={24}>
            <Col xs={12} lg={12} offset={12}>
              <Form.Item
                name='tahun'
                label='Tahun'
                rules={[{ required: true }]}
              >
                <Comp.Antd.RangePicker
                  style={{ width: '100%' }}
                  onChange={onChangeDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem',
            }}
          >
            <Button size='middle' danger onClick={onClear}>
              Clear
            </Button>
            <Button
              onClick={onDownloadExcel}
              disabled={startDate === '' && endDate === '' ? true : false}
            >
              Download Excel
            </Button>
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
