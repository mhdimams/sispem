import React, { useState, useCallback, ReactNode } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';

import {
  FileSyncOutlined,
  UploadOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

interface PageLayoutProps {
  children: JSX.Element;
}

interface IMenu {
  key: string;
  label: string;
  url: string;
  icon: ReactNode;
}

interface SidebarMenuProps {
  dark?: boolean;
  setVisible?: (state: boolean) => void;
}

const menu: IMenu[] = [
  {
    key: 'siswa',
    label: 'Siswa',
    url: '/',
    icon: <UploadOutlined />,
  },

  {
    key: 'pembayaran',
    label: 'Pembayaran',
    url: '/pembayaran',
    icon: <FileSyncOutlined />,
  },

  {
    key: 'viewReport',
    label: 'Laporan',
    url: '/view-report',
    icon: <FileSearchOutlined />,
  },
];

const url_string = window.location.href;
const urlParams = new URL(url_string);

const SidebarMenu = observer(({ dark, setVisible }: SidebarMenuProps) => {
  const { app, siswa, laporanPembayaran, pembayaran } = useStores();
  const history = useHistory();

  const handleClick = useCallback(
    (key: string, url: string) => {
      history.push({ pathname: url, search: urlParams.search });
      app.handleState('selectedTab', key);
      if (key === 'siswa') {
        siswa.clearData();
      } else if (key === 'viewReport') {
        laporanPembayaran.clearData();
      } else if (key === 'pembayaran') {
        pembayaran.clearSearch();
      }
    },
    [app, history, siswa, laporanPembayaran, pembayaran]
  );

  return (
    <>
      <Menu
        theme={dark ? 'dark' : 'light'}
        mode='inline'
        defaultSelectedKeys={[app.selectedTab]}
      >
        {menu.map((item) => {
          return (
            <Menu.Item
              key={item.key}
              onClick={() => handleClick(item.key, item.url)}
              icon={item.icon}
            >
              {item.label}
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
});

const PageLayout = ({ children }: PageLayoutProps) => {
  const {
    app: { nama, logout },
  } = useStores();

  const [visible, setVisible] = useState(false);

  const onLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={visible}
        onCollapse={() => setVisible((prev) => !prev)}
        width={250}
      >
        <div className='logo'></div>
        <SidebarMenu dark={true} />
      </Sider>
      <Layout className='site-layout'>
        <Header className='layout-header'>
          <div className='header-name'>
            Hi! <b>{nama}</b>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={onLogout}>
            Logout
          </div>
        </Header>
        <Content>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2021 Tasbi Football club
        </Footer>
      </Layout>
    </Layout>
  );
};

export default observer(PageLayout);
