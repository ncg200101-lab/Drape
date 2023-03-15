import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Quill = () => {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue([
      { insert: 'Hello ' },
      { insert: 'World!', attributes: { bold: true } },
      { insert: '\n' }
    ]);
  }, []);
  const qModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: ['#ff6c00', '#232f3e'] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['image', 'link'],
      ['clean']
    ]
  };
  const qFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ];
  return (
    <ReactQuill
      theme="snow"
      modules={qModules}
      formats={qFormats}
      value={value}
      onChange={setValue}
    />
  );
};

export default Quill;
