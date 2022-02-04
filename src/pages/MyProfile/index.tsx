import React, { useCallback } from 'react';
import { Col, Card, Form, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { BlockUi } from '../../components';
import { useStores } from '../../models';
import * as Comp from '../../components';

const MyProfile = () => {
  const {
    app: { isLoading, changePassword },
  } = useStores();

  const [form] = Form.useForm();

  const onFinish = useCallback(async () => {
    const data = await form.validateFields();

    await changePassword(data);
  }, [form, changePassword]);

  return (
    <BlockUi isLoading={isLoading}>
      <Col span='8' offset='8'>
        <Card title='MIMAM' style={{ marginTop: '5rem' }}>
          <Form
            form={form}
            labelAlign='left'
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item
              label='Old Password'
              name='oldPassword'
              rules={[{ required: true }]}
            >
              <Comp.Antd.InputPassword />
            </Form.Item>
            <Form.Item
              label='New Password'
              name='newPassword'
              rules={[{ required: true }]}
            >
              <Comp.Antd.InputPassword />
            </Form.Item>
            <Form.Item
              label='New Password Confirmation'
              name='newPasswordConfirmation'
              rules={[{ required: true }]}
            >
              <Comp.Antd.InputPassword />
            </Form.Item>

            <Form.Item>
              <Button htmlType='submit' type='primary' block>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </BlockUi>
  );
};

export default observer(MyProfile);
