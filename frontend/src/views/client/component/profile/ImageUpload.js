import { useState } from 'react';
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

import 'antd/dist/reset.css';
import DFnewLogger from 'utils/DFnewLogger';
import MyEnvConfig from 'configs/MyEnvConfig';
import GlobalEnv from 'configs/GlobalEnv';
import { setAlert } from 'actions/alert';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const beforeUpload = (file) => {
  const isJpgOrPng =
    file.type === 'image/jpg' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/png';
  if (!isJpgOrPng) {
    setAlert('You can only upload JPG/JPEG/PNG file!', 'error');
  }
  return isJpgOrPng;
};

const ImageUpload = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState(
    props.value === '' ? [] : [{ uid: '-1', status: 'done', url: props.value }]
  );
  const onChange = (info) => {
    DFnewLogger('onChange/info: ', info);
    if (info.file.status === 'done') {
      DFnewLogger('response', info.file.response);
      props.setFieldValue(props.arg, info.file.response.imgName);
    }
    if (info.file.status === 'removed') {
      props.setFieldValue(props.arg, '');
      setFileList([]);
    }
    setFileList(info.fileList);
  };
  const onPreview = async (file) => {
    DFnewLogger('onPreview/file: ', file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  const onPreviewCancel = () => setPreviewOpen(false);
  const header = {
    headers: {
      'df-auth-token': `${MyEnvConfig.bearer.tokenPrefix} ${localStorage.dftoken}`
    }
  };
  DFnewLogger('image-url: _______________', props.value);
  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          name="dfimg"
          method="POST"
          action={`${
            GlobalEnv.isDebug
              ? MyEnvConfig.baseurl.dev
              : MyEnvConfig.baseurl.prod
          }/dfnew/uploadfile/upldimg/${props.arg}`}
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={onChange}
          onPreview={onPreview}
          style={{ width: '100%', aspectRatio: '1 / 1' }}
          {...header}
          accept=".jpeg,.jpg,.png"
        >
          {fileList.length < 1 && (
            <FontAwesomeIcon
              icon={faCameraRetro}
              style={{ fontSize: '35px', color: '#232f3e' }}
            />
          )}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={onPreviewCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default ImageUpload;
