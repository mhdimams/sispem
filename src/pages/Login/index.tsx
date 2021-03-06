import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import * as Comp from '../../components';
import { useStores } from '../../models';

const { Title } = Typography;
const Login = () => {
  const {
    app: { handleStateForm, requestToken, clearStateForm, isLoading },
  } = useStores();
  const [form] = Form.useForm();
  const history = useHistory();

  const onChangeInput = useCallback(
    (field: string, value: string | number | boolean) => {
      handleStateForm(field, value);
    },
    [handleStateForm]
  );
  const onFinish = useCallback(async () => {
    await form.validateFields();

    const res = await requestToken();

    if (res) {
      form.resetFields();
      clearStateForm();
    }
  }, [requestToken, form, clearStateForm]);

  return (
    <Comp.BlockUi isLoading={isLoading}>
      <main className='login-container full-screen'>
        <section className='left-area'>
          <div className='bg-logo'></div>
          <div className='login-content'>
            <div
              className='login-title'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: '0.8rem',
              }}
            >
              <Title
                level={2}
                style={{
                  margin: 0,
                }}
              >
                Login, Administrator
              </Title>
              <div
                style={{
                  color: '#2980b9',

                  margin: 0,
                }}
              >
                <button
                  style={{
                    padding: '0.5rem 1.5rem',
                    borderRadius: '25px',
                    fontWeight: 500,
                    backgroundColor: 'transparent',
                    border: '2px solid #2980b9',
                    cursor: 'pointer',
                  }}
                  onClick={() => history.push('/pembayaran-siswa')}
                >
                  Lihat Tagihan Siswa
                </button>
              </div>
            </div>
            <Form
              form={form}
              labelAlign='left'
              layout='vertical'
              onFinish={onFinish}
            >
              <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true }]}
              >
                <Comp.Antd.Input
                  onChange={(event) =>
                    onChangeInput('username', event.target.value)
                  }
                />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true }]}
              >
                <Comp.Antd.InputPassword
                  onChange={(event) =>
                    onChangeInput('password', event.target.value)
                  }
                />
              </Form.Item>

              <Form.Item>
                <Button htmlType='submit' type='primary'>
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
        <section className='right-area'>
          <div className='banner'></div>
        </section>
      </main>
    </Comp.BlockUi>
  );
};

export default observer(Login);
