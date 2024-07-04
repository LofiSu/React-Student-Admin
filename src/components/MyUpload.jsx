// 从 React 和 Ant Design 导入必要的库和组件。
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';

// 函数：将图片文件转换为 base64 字符串。
const getBase64 = (img, callback) => {
    const reader = new FileReader(); // 创建一个新的 FileReader 实例。
    reader.addEventListener('load', () => callback(reader.result)); // 添加事件监听器，在读取完成后调用回调函数并传递结果。
    reader.readAsDataURL(img); // 将图片文件读取为 data URL（base64）。
};

// 函数：在上传之前验证图片。
const beforeUpload = (file) => {
    // 检查文件类型是否为 JPEG 或 PNG。
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!'); // 如果文件类型不支持，显示错误消息。
    }
    // 检查文件大小是否小于 2MB。
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!'); // 如果文件大小过大，显示错误消息。
    }
    // 如果两个检查都通过则返回 true，否则返回 false。
    return isJpgOrPng && isLt2M;
};

// 定义 MyUpload 组件。
const MyUpload = () => {
    // 状态：管理加载状态。
    const [loading, setLoading] = useState(false);
    // 状态：管理图片 URL。
    const [imageUrl, setImageUrl] = useState();

    // 函数：处理上传组件中的变化。
    const handleChange = (info) => {
        // 如果文件正在上传中，设置加载状态为 true。
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        // 如果文件上传完成，将文件转换为 base64 URL。
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false); // 设置加载状态为 false。
                setImageUrl(url); // 设置图片 URL 状态。
            });
        }
    };

    // 定义上传按钮，根据加载状态显示不同的图标。
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    // 返回 MyUpload 组件的 JSX。
    return (
        <Flex gap="middle" wrap>
            {/* 第一个 Upload 组件，使用 picture-card 列表类型
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="这个demo项目只是页面级的没有后端接口" // 上传地址（占位符）
                beforeUpload={beforeUpload} // 上传之前调用 beforeUpload 函数。
                onChange={handleChange} // 更改时调用 handleChange 函数。
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload> */}

            {/* 第二个 Upload 组件，使用 picture-circle 列表类型 */}
            <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="这个demo项目只是页面级别的没有写后端接口" // 上传地址（模拟 API）
                beforeUpload={beforeUpload} // 上传之前调用 beforeUpload 函数。
                onChange={handleChange} // 更改时调用 handleChange 函数。
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </Flex>
    );
};

// 默认导出 MyUpload 组件。
export default MyUpload;