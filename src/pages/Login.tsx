import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface PasswordRule {
  label: string;
  test: (val: string) => boolean;
}

interface LoginFormValues {
  username: string;
  password: string;
}

const passwordRules: PasswordRule[] = [
  {
    label: 'At least 8 characters',
    test: (val: string) => val.length >= 8,
  },
  {
    label: 'At least one uppercase letter (A-Z)',
    test: (val: string) => /[A-Z]/.test(val),
  },
  {
    label: 'At least one lowercase letter (a-z)',
    test: (val: string) => /[a-z]/.test(val),
  },
  {
    label: 'At least one number (0-9)',
    test: (val: string) => /\d/.test(val),
  },
  {
    label: 'At least one special character (@$!%*?&)',
    test: (val: string) => /[@$!%*?&]/.test(val),
  },
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');

  const onFinish = (values: LoginFormValues): void => {
    const { username, password } = values;
    
    if (username === 'admin' && password === '@Dmin123456') {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    } else {
      message.error('Username or password is incorrect.');
    }
  };

  return (
    <div style={{ 
      maxWidth: 320, 
      margin: '100px auto', 
      padding: 24, 
      backgroundColor: "#2d2b2b", 
      borderRadius: 8 
    }}>
      <h2 style={{ textAlign: 'center', color: "white" }}>Login</h2>
      <Form<LoginFormValues> name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Username is required' },
            { min: 4, message: 'Username must be at least 4 characters' },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Password is required' },
            {
              validator: (_, value: string) => {
                const allPassed = passwordRules.every((rule: PasswordRule) =>
                  rule.test(value || '')
                );
                return allPassed
                  ? Promise.resolve()
                  : Promise.reject(new Error('Password does not meet requirements.'));
              },
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </Form.Item>

        <div style={{ marginBottom: 16 }}>
          {passwordRules.map((rule: PasswordRule, index: number) => {
            const passed: boolean = rule.test(password);
            return (
              <div key={index} style={{ color: passed ? 'green' : 'red', fontSize: 13 }}>
                {passed ? '✅' : '❌'} {rule.label}
              </div>
            );
          })}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;