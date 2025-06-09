import React from 'react';
import {
  Table,
  Card,
  Typography,
  Tag,
  Space,
  Button,
  message,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const { Title } = Typography;

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
}

// Type-safe version of QueryClient config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    },
  },
} as any); 

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const UsersTable: React.FC = () => {
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const handleRefresh = () => {
    refetch();
    message.success('Data refreshed successfully!');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      sorter: (a: User, b: User) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: User) => (
        <Space>
          <UserOutlined className="text-blue-500" />
          <span className="font-medium">{record.name}</span>
        </Space>
      ),
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (username: string) => <Tag color="blue">{username}</Tag>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <Space>
          <MailOutlined className="text-green-500" />
          <a href={`mailto:${email}`}>{email}</a>
        </Space>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => (
        <Space>
          <PhoneOutlined className="text-orange-500" />
          <span>{phone}</span>
        </Space>
      ),
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (website: string) => (
        <Space>
          <GlobalOutlined className="text-purple-700" />
          <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        </Space>
      ),
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
      render: (companyName: string) => <Tag color="green">{companyName}</Tag>,
    },
    {
      title: 'City',
      dataIndex: ['address', 'city'],
      key: 'city',
      render: (city: string) => <span className="text-gray-600">{city}</span>,
    },
  ];

  if (error) {
    return (
      <Card>
        <div className="text-center py-12">
          <Title level={4} type="danger">
            Error loading users: {error.message}
          </Title>
          <Button type="primary" onClick={handleRefresh}>
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <Space>
          <UserOutlined />
          <span>Users</span>
        </Space>
      }
      extra={
        <Button type="primary" onClick={handleRefresh} loading={isLoading}>
          Refresh Data
        </Button>
      }
      className="lg:m-5 !owerflow-x-hidden !w-[250px] sm:!w-[530px] lg:!w-[820px] xl:!w-[1024px] 2xl:!w-full"
    >
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
        }}
        scroll={{ x: 'max-content' }} 
        size="middle"
        bordered
        className="bg-white rounded-lg"
      />
    </Card>
  );
};

const DataTable: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 py-5">
        <div className="max-w-screen-xl mx-auto">
          <Title level={2} className="text-center mb-8">
            Users Directory
          </Title>
          <UsersTable />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default DataTable;
