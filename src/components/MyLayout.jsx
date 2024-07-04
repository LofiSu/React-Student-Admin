import { useEffect, useState } from 'react'; // 导入 React 的 hooks，useEffect 用于副作用处理，useState 用于状态管理

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons'; // 导入 Ant Design 的图标

import { Button, Layout, Menu, theme, Dropdown, message, Breadcrumb } from 'antd'; // 导入 Ant Design 的组件

import logo from '../assets/logo.png'; // 导入本地的 logo 图片

import { useNavigate, useLocation } from 'react-router-dom'; // 导入 React Router 的 hooks，用于导航和获取当前路径

const { Header, Sider, Content } = Layout; // 从 Layout 组件中解构出 Header、Sider、Content 组件

// 下拉菜单的菜单数据
const items = [
  {
    key: '/home',
    label: (
      <a>
        个人中心
      </a>
    ),
  },
  {
    key: 'logOut',
    label: (
      <a>
        退出
      </a>
    ),
  },
];

// 侧边栏菜单数据
const itemsMenuData = [
  {
    key: '/admin/student_menu',
    icon: <UserOutlined />, // 学生管理菜单的图标
    label: '学生管理',
    children: [ // 学生管理子菜单
      {
        label: '学生分类',
        key: '/admin/student_menu/student_type'
      },
      {
        label: '学生列表',
        key: '/admin/student_menu/student_list'
      },
    ]
  },
  {
    key: '/admin/class_menu',
    icon: <ReadOutlined />, // 班级管理菜单的图标
    label: '班级管理',
    children: [ // 班级管理子菜单
      {
        label: '班级分类',
        key: '/admin/class_menu/class_type'
      },
      {
        label: '班级列表',
        key: '/admin/class_menu/class_list'
      },
    ]
  },
  {
    key: '/admin/course_menu',
    icon: <UploadOutlined />, // 课程管理菜单的图标
    label: '课程管理',
  },
];

// 查找对应地址
const searchUrlKey = (key) => {
  let arrObj = []; // 存放匹配的菜单 key
  const demoFn = (_arr) => {
    _arr.forEach(n => {
      // 检查 key 是否包含菜单项的 key，表示这是一个父子关系
      if (key.includes(n.key)) {
        arrObj.push(n.key);
        if (n.children) {
          // 递归调用，处理子菜单
          demoFn(n.children);
        }
      }
    });
  };
  demoFn(itemsMenuData);
  return arrObj;
};

// 生成面包屑导航
const creatNavFn = (key) => {
  let arrObj = []; // 存放导航条数据

  const demoFn = (arr) => {
    arr.forEach(n => {
      const { children, ...info } = n; // 解构，去除 children 属性，剩余部分存入 info
      arrObj.push(info);

      if (children) {
        // 递归调用，处理子菜单
        demoFn(children);
      }
    });
  };
  demoFn(itemsMenuData);

  // 过滤数据，只保留 key 匹配的项
  const temp = arrObj.filter(m => key.includes(m.key));
  if (temp.length > 0) {
    // 返回数组，包含首页和匹配的菜单项
    return [{ label: '首页', key: '/admin/student_menu/student_type' }, ...temp];
  }
  return [];
};

// eslint-disable-next-line react/prop-types
const MyLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false); // 状态，控制侧边栏是否收起

  const {
    token: { colorBgContainer },
  } = theme.useToken(); // 从主题中获取颜色 token

  const navigate = useNavigate(); // 路由跳转函数
  const { pathname } = useLocation(); // 获取当前路径

  // 下拉菜单的点击事件处理
  const onClick = ({ key }) => {
    if (key === 'logOut') {
      navigate('/login'); // 退出登录，跳转到登录页
    } else {
      message.info('还没开通呢~'); // 提示信息
    }
  };

  let demoItemsArr = searchUrlKey(pathname); // 查找对应路径的菜单项 key

  const [navurl, setNavurl] = useState([]); // 状态，存放面包屑导航条数据

  // 面包屑导航的回调和监听
  useEffect(() => {
    setNavurl(creatNavFn(pathname)); // 更新面包屑导航条数据
  }, [pathname]); // 依赖 pathname，路径变化时更新

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logoImg">
          <img src={logo} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={[demoItemsArr]}
          defaultSelectedKeys={[demoItemsArr]}
          onClick={({ key }) => {
            navigate(key); // 菜单项点击时导航
          }}
          items={itemsMenuData} // 菜单数据
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)} // 切换侧边栏收起状态
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <span className='titleDiv'>酥酥的学生管理系统</span>
          <Dropdown
            menu={{
              items, onClick
            }}
          >
            <img src={logo} style={{
              width: '30px', borderRadius: '100%', float: 'right', margin: '15px 20px 0 0'
            }} />
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {/* 面包屑导航 */}
          <Breadcrumb style={{ margin: '0 0 20px 0' }}>
            {navurl.map(n => (
              <Breadcrumb.Item key={n.key}>{n.label}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {children} {/* 渲染子组件 */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
