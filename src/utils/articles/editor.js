import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed';
import axios from 'axios';

const uploadImage = async (file) => {
  const url = process.env.CLOUDINARY_UPLOAD_URL;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
  const res = await axios.post(url, formData, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  return {
    success: 1,
    file: {
      url: res.data.url,
    },
  };
};

const Editor = (data = null) => {
  const editor = new EditorJS({
    holder: '1kbideas-editor',
    placeholder: 'Share your story',
    tools: {
      header: {
        class: Header,
        inlineToolbar: ['link']
      },
      embed: {
        class: Embed,
        inlineToolbar: true
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true
      },
      image: {
        class: ImageTool,
        inlineToolbar: true,
        config: {
          placeholder: 'Paste image URL',
          uploader: {
            uploadByFile(file) {
              return uploadImage(file);
            },
            uploadByUrl(url) {
              return uploadImage(url);
            }
          }
        }
      }
    },
    data
  });
  return editor;
};


export default Editor;
