import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";

import { createPost } from "../actions/posts";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    snippet: "",
    body: "",
    tags: [],
    selectedFile: "",
    published: true,
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clear = () => {
    setPostData({
      title: "",
      snippet: "",
      body: "",
      tags: [],
      selectedFile: "",
      published: true,
    });
    setFiles([]);
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    const result = await dispatch(createPost(postData));

    if (result.success) {
      clear();
      navigate("/");
    } else {
      setErrors(result.errors);
    }
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    if (files.length === 0) {
      setPostData((prev) => ({ ...prev, selectedFile: "" }));
    } else {
      const fileItem = files[0];
      if (fileItem.origin === "local") {
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

  return (
    <div className="max-w-xl mx-auto bg-transparent border border-white/20 backdrop-blur-md rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-[var(--color-light-red)]">
        Create a Post
      </h2>

      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <ul className="list-disc list-inside text-red-400">
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-white/80 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            className="shadow appearance-none border border-white/10 rounded w-full py-2 px-3 text-white bg-white/5 leading-tight focus:outline-none focus:border-[var(--color-light-purple)] focus:ring-1 focus:ring-[var(--color-light-purple)]"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white/80 text-sm font-bold mb-2"
            htmlFor="snippet"
          >
            Snippet
          </label>
          <input
            type="text"
            id="snippet"
            value={postData.snippet}
            onChange={(e) =>
              setPostData({ ...postData, snippet: e.target.value })
            }
            className="shadow appearance-none border border-white/10 rounded w-full py-2 px-3 text-white bg-white/5 leading-tight focus:outline-none focus:border-[var(--color-light-purple)] focus:ring-1 focus:ring-[var(--color-light-purple)]"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white/80 text-sm font-bold mb-2"
            htmlFor="body"
          >
            Body
          </label>
          <textarea
            id="body"
            value={postData.body}
            onChange={(e) => setPostData({ ...postData, body: e.target.value })}
            className="shadow appearance-none border border-white/10 rounded w-full py-2 px-3 text-white bg-white/5 leading-tight focus:outline-none focus:border-[var(--color-light-purple)] focus:ring-1 focus:ring-[var(--color-light-purple)] h-32"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white/80 text-sm font-bold mb-2"
            htmlFor="tags"
          >
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={postData.tags.join(",")}
            onChange={(e) =>
              setPostData({
                ...postData,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
            className="shadow appearance-none border border-white/10 rounded w-full py-2 px-3 text-white bg-white/5 leading-tight focus:outline-none focus:border-[var(--color-light-purple)] focus:ring-1 focus:ring-[var(--color-light-purple)]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white/80 text-sm font-bold mb-2">
            Image
          </label>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            acceptedFileTypes={["image/*"]}
            maxFileSize="5MB"
            labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
            className="bg-white/5 border border-white/10 rounded"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[var(--color-light-red)] hover:bg-[var(--color-light-red)]/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-light-red)]/50 transition-colors duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            onClick={clear}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
