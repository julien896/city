
import React from 'react'
console.log(React)




import {
  Form, Input,
} from "antd";


function AbsenceRequestModalForm() {
  const [form] = Form.useForm();

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      scrollToFirstError
    >
      <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
}
export default AbsenceRequestModalForm;
