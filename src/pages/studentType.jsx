
import { useState } from "react";
import { Card, Button, Form, Input, Table, Modal, message } from 'antd';
import { PlusOutlined, RetweetOutlined } from "@ant-design/icons";
import MyUpload from '../components/MyUpload'
function StudentType() {
    const [isShow, setIsShow] = useState(false)
    //[]抱着变量的写法就是es6的数组解构赋值
    //从数组中提取值，按照对应位置，对变量赋值
    const [MyForm] = Form.useForm()
    return (
        <>
            <Card
                title="学生分类"
                extra={
                    <div>
                        <Button type="primary" icon={<PlusOutlined />}
                            onClick={() => {
                                setIsShow(true)
                            }}></Button>
                    </div>
                }
            >
                <Form layout="inline">
                    <Form.Item label="姓名">
                        <Input placeholder="请输入要查询的姓名" />
                    </Form.Item>
                    <Form.Item label="姓名">
                        <Button type="primary" icon={<RetweetOutlined />}></Button>
                    </Form.Item>
                </Form>
                <Table columns={[{
                    title: '序号',
                    width: 80
                }, {
                    title: '姓名'

                }, {
                    title: '照片',
                    width: 120
                }, {
                    title: '序号',
                    width: 80
                }, {
                    title: '成绩'

                }, {
                    title: '操作'
                },]}>
                </Table>
            </Card>
            <Modal
                title="编辑输入框"
                open={isShow}
                maskClosable={false}
                onCancel={() => setIsShow(false)}
                onOk={() => {

                    MyForm.submit()
                }}>
                {/* 这里写Form表单的内容 */}
                <Form
                    form={MyForm}
                    labelCol={{ span: 3 }}
                    onFinish={(n) => {
                        message.success('添加成功！')
                        console.log(n)
                    }}>
                    <Form.Item
                        label='姓名'
                        name='name'
                        rules={[{
                            required: true,
                            message: '请输入姓名'
                        }]}>
                        <Input placeholder="请输入你的名字" />
                    </Form.Item>
                    <Form.Item label='照片'>
                        <MyUpload />
                    </Form.Item>
                    <Form.Item label='简介' name='desc'>
                        <Input.TextArea placeholder="请输入介绍" />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default StudentType;
