import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";

import { updatePost, getPost } from "../actions/posts";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [postData, setPostData] = useState({
    title: "",
    snippet: "",
    body: "",
    tags: [],
    selectedFile: "",
    published: true,
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch post data on mount
  useEffect(() => {
    let ignore = false;
    const fetchPostData = async () => {
      try {
        console.log("Fetching post data for ID:", id);
        if (id) {
          setLoading(true);
          const data = await dispatch(getPost(id));
          console.log("Received post data from API:", data);
          if (data && !ignore) {
            const newPostData = {
              title: data.title || "",
              snippet: data.snippet || "",
              body: data.body || data.message || "",
              tags: data.tags || [],
              selectedFile: data.selectedFile || "",
              published: data.published ?? true,
            };
            console.log("Setting initial post data:", newPostData);
            setPostData(newPostData);

            // Only set files if we have a valid base64 image
            if (
              data.selectedFile &&
              typeof data.selectedFile === "string" &&
              data.selectedFile.startsWith("data:")
            ) {
              console.log("Setting initial file:", data.selectedFile);
              setFiles([
                {
                  source: data.selectedFile,
                  options: { type: "local" },
                },
              ]);
            } else {
              // Clear files if no valid image
              setFiles([]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setErrors([{ msg: "Failed to load post data" }]);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    fetchPostData();
    return () => {
      ignore = true;
    };
  }, [id, dispatch]);

  // Handle file changes
  React.useEffect(() => {
    console.log("Files changed:", files);
    if (files.length === 0) {
      console.log("No files, clearing selectedFile");
      setPostData((prev) => {
        const newData = { ...prev, selectedFile: "" };
        console.log("Updated postData:", newData);
        return newData;
      });
    } else {
      const fileItem = files[0];
      console.log("Processing file item:", fileItem);

      if (fileItem.file) {
        console.log("Converting new file to base64");
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log("File converted to base64");
          setPostData((prev) => {
            const newData = { ...prev, selectedFile: reader.result };
            console.log("Updated postData with new image:", newData);
            return newData;
          });
        };
        reader.readAsDataURL(fileItem.file);
      } else if (
        typeof fileItem.source === "string" &&
        fileItem.source.startsWith("data:")
      ) {
        console.log("Using existing base64 image");
        setPostData((prev) => {
          const newData = { ...prev, selectedFile: fileItem.source };
          console.log("Updated postData with existing image:", newData);
          return newData;
        });
      }
    }
  }, [files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      // Create a copy of postData to ensure we're sending the latest state
      const updateData = {
        ...postData,
        selectedFile: postData.selectedFile, // Always send the current selectedFile value
      };

      console.log("Submitting update with data:", {
        ...updateData,
        selectedFile: updateData.selectedFile
          ? "base64 image present"
          : "no image",
      });

      const result = await dispatch(updatePost(id, updateData));
      console.log("Update result:", result);

      if (result.success) {
        navigate("/");
      } else {
        setErrors(result.errors);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setErrors([{ msg: "Failed to update post" }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setPostData({ ...postData, tags });
  };

  const handlePublishChange = (e) => {
    setPostData({ ...postData, published: e.target.checked });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-light-red)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-transparent border border-white/20 backdrop-blur-md rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-[var(--color-light-red)]">
        Edit Post
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
            name="title"
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
            name="snippet"
            value={postData.snippet}
            onChange={(e) =>
              setPostData({ ...postData, snippet: e.target.value })
            }
            className="shadow appearance-none border border-white/10 rounded w-full py-2 px-3 text-white bg-white/5 leading-tight focus:outline-none focus:border-[var(--color-light-purple)] focus:ring-1 focus:ring-[var(--color-light-purple)]"
            required
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
            name="body"
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
            name="tags"
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
            {isSubmitting ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
