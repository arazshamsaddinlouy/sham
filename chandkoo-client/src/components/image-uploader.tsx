import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";

interface FileUploaderProps {
  handleFile: (file: File | null) => void;
}

const ImageUploader: React.FC<FileUploaderProps> = ({ handleFile }) => {
  const [fileList, setFileList] = useState<any[]>([]);

  const uploadProps: UploadProps = {
    maxCount: 1,
    accept: "image/*", // Only accept image files
    fileList,
    beforeUpload: (file) => {
      if (!file.type.startsWith("image/")) {
        console.error("Only image files are allowed!");
        return false;
      }
      setFileList([file]); // Store selected file
      handleFile(file); // Pass file to parent
      return false; // Prevent auto-upload
    },
    onRemove: () => {
      setFileList([]);
      handleFile(null);
    },
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: true,
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Select Image</Button>
    </Upload>
  );
};

export default ImageUploader;
