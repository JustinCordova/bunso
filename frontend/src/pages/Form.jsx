import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

import 'filepond/dist/filepond.min.css';

import { createPost, updatePost } from '../actions/posts';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const [postData, setPostData] = useState({
    title: '',
    snippet: '',
    body: '',
    tags: [],
    selectedFile: '',
    published: true,
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (post) {
      const { creator, slug, message, ...rest } = post;
      setPostData({
        ...rest,
        body: message || '',
        snippet: post.snippet || '',
      });

      if (post.selectedFile) {
        setFiles([{ source: post.selectedFile, options: { type: 'local' } }]);
      }
    }
  }, [post]);

  useEffect(() => {
    if (files.length === 0) {
      setPostData((prev) => ({ ...prev, selectedFile: '' }));
    } else {
      const fileItem = files[0];
      if (fileItem.origin === 'local') {
        setPostData((prev) => ({ ...prev, selectedFile: fileItem.source }));
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(fileItem.file);
        reader.onloadend = () => {
          setPostData((prev) => ({ ...prev, selectedFile: reader.result }));
        };
      }
    }
  }, [files]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      snippet: '',
      body: '',
      tags: [],
      selectedFile: '',
      published: true,
    });
    setFiles([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === null || currentId === 0) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
    }

    clear();
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {currentId ? `Editing "${post?.title}"` : 'Create a Post'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Snippet (short preview or description)"
          value={postData.snippet}
          onChange={(e) => setPostData({ ...postData, snippet: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          placeholder="Body"
          value={postData.body}
          onChange={(e) => setPostData({ ...postData, body: e.target.value })}
          rows={5}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={postData.tags.join(',')}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(',').map((tag) => tag.trim()),
            })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            acceptedFileTypes={['image/png', 'image/jpeg']}
            maxFileSize="5MB"
            labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
            allowImagePreview={true}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={postData.published}
            onChange={(e) =>
              setPostData({ ...postData, published: e.target.checked })
            }
            id="published"
            className="h-4 w-4"
          />
          <label htmlFor="published" className="select-none">
            Published
          </label>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={clear}
            className="flex-1 bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
