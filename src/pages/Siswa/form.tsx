import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Button, Form } from 'antd';
import moment from 'moment';

import * as Comp from '../../components';
import { useStores } from '../../models';
import { SwallSuccess, SwalError } from '../../utils/sweetalert';
interface FormSiswaProps {
  visible: boolean;
  setVisible(visible: boolean): void;
  id?: number | null;
}

const FormSiswa: React.FC<FormSiswaProps> = ({ visible, setVisible, id }) => {
  const [inputForm] = Form.useForm();
  const {
    siswa: { getOneSiswa, form, clearForm, updateOrCreate, handleStateForm,getListSiswa },
  } = useStores();

  useEffect(() => {
    const get = async (params: number) => {
      await getOneSiswa(params);
    };
    if (id) {
      get(id).then(() => {
        inputForm.setFieldsValue({
          ...form,
          tanggal_masuk: moment(form.tanggal_masuk, 'YYYY-MM-DD').isValid()
            ? moment(form.tanggal_masuk, 'YYYY-MM-DD')
            : null,
        });
      });
    }
  }, [id, getOneSiswa, inputForm, form]);

  const onCancel = useCallback(() => {
    setVisible(false);
    inputForm.resetFields();
    clearForm();
  }, [setVisible, inputForm, clearForm]);

  const onSubmit = useCallback(async () => {
    await inputForm.validateFields();

    const res = await updateOrCreate();
    if (res) {
      SwallSuccess({
        text: `Data berhasil ${id ? 'Disimpan' : 'Ditambahkan'}`,
        title: 'Success',
      }).then((success) => {
        setVisible(false);
        inputForm.resetFields();
        clearForm();
        getListSiswa()
      });
    } else {
      SwalError(`Gagal ${id ? 'Menyimpan' : 'Menambah'} Data`);
    }
  }, [inputForm, updateOrCreate, id,  setVisible,clearForm,getListSiswa]);

  return (
    <Modal
      visible={visible}
      title={id ? 'Edit' : 'Add'}
      onCancel={onCancel}
      footer={[
        <Button key='sumit' type='primary' onClick={() => inputForm.submit()}>
          {id ? 'Simpan' : 'Tambah'}
        </Button>,
      ]}
    >
      <Form
        form={inputForm}
        labelAlign='left'
        layout='vertical'
        onFinish={onSubmit}
      >
        <Form.Item
          name='nama'
          label='Nama'
          rules={[{ required: true, message: 'Nama Tidak Boleh Kosong' }]}
        >
          <Comp.Antd.Input
            onChange={(e) => handleStateForm('nama', e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name='nomor_handphone'
          label='Nomor Handphone'
          rules={[{ required: true, message: 'Nomor Tidak Boleh Kosong' }]}
        >
          <Comp.Antd.Input
            onChange={(e) => handleStateForm('nomor_handphone', e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name='umur'
          label='Umur'
          rules={[{ required: true, message: 'Umur Tidak Boleh Kosong' }]}
        >
          <Comp.Antd.InputNumber
            onChange={(value) => handleStateForm('umur', value)}
          />
        </Form.Item>

        <Form.Item
          name='tanggal_masuk'
          label='Tanggal Masuk'
          rules={[
            { required: true, message: 'Tanggal Masuk Tidak Boleh Kosong' },
          ]}
        >
          <Comp.Antd.DatePicker
            onChange={(date, dateString) =>
              handleStateForm('tanggal_masuk', dateString)
            }
          />
        </Form.Item>

        <Form.Item name='alamat' label='Alamat'>
          <Comp.Antd.TextArea
            rows={4}
            onChange={(e) => handleStateForm('alamat', e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(FormSiswa);
