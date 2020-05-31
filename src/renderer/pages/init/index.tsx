import React, { useState } from 'react';
import { connect, Dispatch } from 'dva';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './style.less';
import { CheckOutlined } from '@ant-design/icons';
import { DefaultSetting } from '@/global';

interface InitPagePropsType {
  dispatch: Dispatch,
  init: any
}

function InitPage({ dispatch, init }: InitPagePropsType) {
  const [form] = Form.useForm();
  const [isUserDefaultInstallPath, setIsUserDefaultInstallPath] = useState(true);
  const applySetting = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        console.log(values);
        dispatch({
          type: 'init/apply',
          payload: {
            ...values,
          },
        });
      })
      .catch(info => {
        message.error('请检查输入');
      });
  };
  return (
    <div>
      <div className={styles.form}>
        <Form
          name="basic"
          form={form}
          initialValues={{ repo: DefaultSetting.mirror }}
        >
          <Form.Item
            label="软件源"
            name="repo"
            rules={[{ required: true, message: '软件源必须' }]}
          >
            <Input placeholder={"软件源地址URL"}/>
          </Form.Item>

        </Form>
      </div>
      <Button size={'large'} shape="circle" className={styles.actionButton} onClick={applySetting}>
        <CheckOutlined/>
      </Button>
    </div>
  );
}

export default connect(({ init }: any) => ({ init }))(InitPage);
