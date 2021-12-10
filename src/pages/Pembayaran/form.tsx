import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Button, Form, Typography } from 'antd';
import * as Comp from '../../components';
import { useStores } from '../../models';
import { SwalError, SwallSuccess } from '../../utils/sweetalert';

interface FormSiswaProps {
  visible: boolean;
  setVisible(visible: boolean): void;
  id?: number | null;
}

const { Title } = Typography;

const FormSiswa: React.FC<FormSiswaProps> = ({ visible, setVisible, id }) => {
  const [form] = Form.useForm();

  const {
    pembayaran: {
      siswa,
      transaksiBayar,
      updateTransaksiBayar,
      clearTransaksiBayar,
      getDataPembayaran
    },
  } = useStores();

  const onFinish = useCallback(async () => {
    await form.validateFields();
    const res = await updateTransaksiBayar();

    setVisible(false);
    if (res) {
      SwallSuccess({ text: 'Berhasil mengupdate data', title: 'Success' }).then(
        () => {
          clearTransaksiBayar();
          form.resetFields();
          getDataPembayaran();
        }
      );
    } else {
      SwalError('Gagal mengupdate data');
    }
  }, [form, setVisible, updateTransaksiBayar, clearTransaksiBayar,getDataPembayaran]);

  useEffect(() => {
    if(visible) {
      form.setFieldsValue({
        nama: siswa.nama,
        // tamggal_bayar: moment(
        //   transaksiBayar.tanggal_bayar,
        //   'YYYY-MM-DD HH:mm:ss'
        // ),
      });
    }
  }, [siswa.nama, form, visible]);

  const onCancel = useCallback(() => {
    setVisible(false);
    form.resetFields();
    clearTransaksiBayar();
  }, [form, setVisible,clearTransaksiBayar]);

  return (
    <Modal
      visible={visible}
      title='Pembayaran'
      onOk={() => console.log('ok')}
      onCancel={onCancel}
      footer={[
        <Button key='back'>Return</Button>,
        <Button onClick={() => form.submit()} key='submit' type='primary'>
          Bayar
        </Button>,
      ]}
    >
      <div>
        <Title level={5}>Pembayaran : Rp. 60000</Title>
        <Title level={5}>Bulan {transaksiBayar.month}</Title>
      </div>

      <Form form={form} labelAlign='left' layout='vertical' onFinish={onFinish}>
        <Form.Item name='nama' label='Nama'>
          <Comp.Antd.Input disabled={true} />
        </Form.Item>
        <Form.Item
          name='tamggal_bayar'
          label='Tanggal Bayar'
          rules={[
            { required: true, message: 'Silahkan masukkan tanggal bayar' },
          ]}
        >
          <Comp.Antd.DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(FormSiswa);
