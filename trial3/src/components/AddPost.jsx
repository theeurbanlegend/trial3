import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
  const url = import.meta.env.VITE_BACKEND_SERVER_URL;
  const [files, setFiles] = useState(null);
  const [preview, setPreview] = useState('');
  const [category, setCategory] = useState('NEW');
  const [postTitle, setPostTitle] = useState('');
  const [poster, setPoster] = useState('Irush');
  const [postSummary, setPostSummary] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadsuccess, setUploadsuccess] = useState('');
  const [uploadstatus, setUploadstatus] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const formatFileSize = (sizeInBytes) => {
    const kiloBytes = sizeInBytes / 1024;
    const megaBytes = kiloBytes / 1024;
    const gigaBytes = megaBytes / 1024;
  
    if (gigaBytes >= 1) {
      return `${gigaBytes.toFixed(2)} GB`;
    } else if (megaBytes >= 1) {
      return `${megaBytes.toFixed(2)} MB`;
    } else if (kiloBytes >= 1) {
      return `${kiloBytes.toFixed(2)} KB`;
    } else {
      return `${sizeInBytes} Bytes`;
    }
  };
  const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    preventDefault(e);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFiles(file);
      previewFile(file);
    }
  };

  const handleFileSelect = (e) => {
   
    const file = e.target.files[0];
    if (file) {
      setFiles(file);
      previewFile(file);

      // Get file type information
      const fileType = file.type;
      const fileSize = file.size;
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setPreview(reader.result);
    });

    if (file) {
      reader.readAsDataURL(file);

      // Set file information
      setFileName(file.name);
      setFileType(file.type);
      setFileSize(formatFileSize(file.size));
    }
  };

  const submitForm = () => {
    setShowOverlay(true);
    const formData = new FormData();
    formData.append('files', files);
    formData.append('category', category);
    formData.append('postTitle', postTitle);
    formData.append('poster', poster);
    formData.append('postSummary', postSummary);

    axios
      .post(`${url}/api/new`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        setUploadProgress(0);
        setUploadsuccess(true);
        setUploadstatus('Upload Success!!');
        setCategory('');
        setFiles(null);
        setFileName(null);
        setFileSize(null);
        setFileType(null);
        setPreview('');
        setPostTitle('');
        setPostSummary('');
        setPoster('');
        setTimeout(() => setUploadsuccess(''), 5000);
        setShowOverlay(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setUploadsuccess(false);
          setUploadstatus('Upload failed!');
          setUploadProgress(0);
          setShowOverlay(false);
          setTimeout(() => setUploadsuccess(''), 5000);
        }
        console.error(error);
        setUploadProgress(0);
      });
  };

  return (
    <div className="add-post-container">
      {showOverlay && uploadProgress > 0 && (
        <div id="overlay">
          <div className="progress-bar-container">
            <label htmlFor="file">Sit tight as your post is uploaded:</label>
            <br />
            <progress id="file" value={uploadProgress} max="100">
              {uploadProgress}%
            </progress>
            {uploadProgress}%
          </div>
        </div>
      )}
      <svg width={500} height={100}>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#7f00ff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e100ff', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <text style={{ fill: 'url(#grad)', fontSize: 45, textAnchor: 'middle' }} x={250} y={40}>
          Post a Moment &hearts;
        </text>
      </svg>
      <form encType="multipart/form-data">
        <div
          className="drop-zone"
          onDragOver={preventDefault}
          onDragEnter={preventDefault}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <p>Click or Drag & Drop your files here</p>
        </div>
        <input type="file" name="files" id="fileInput" onChange={handleFileSelect} style={{ display: 'none' }} />
        {preview && <img src={preview} alt="Preview" className="preview-files" />}
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" name="postTitle" id="postTitle" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
        <br />
        <label htmlFor="category">Category:</label>
        <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="NEW">NEW 🔥</option>
          <option value="MY FAMILY">MY FAMILY</option>
          <option value="SPORTS">SPORTS</option>
          <option value="HOBBIES">HOBBIES</option>
          <option value="SONGS">SONGS</option>
          <option value="VIDEOS">VIDEOS</option>
        </select>
        <br />
        <label htmlFor="poster">Poster:</label>
        <input type="text" name="poster" id="poster" value={poster} onChange={(e) => setPoster(e.target.value)} />
        <br />
        <label htmlFor="postSummary">Post Summary:</label>
        <textarea name="postSummary" id="postSummary" value={postSummary} onChange={(e) => setPostSummary(e.target.value)}></textarea>
        <br />
        <div className="post-button-area">
          <button type="button" onClick={submitForm} className="post-button">
            Post
          </button>
        </div>
        {fileName && <p>File Name: {fileName}</p>}
        {fileType && <p>File Type: {fileType}</p>}
        {fileSize && <p>File Size: {fileSize}</p>}
        {uploadsuccess === true && (
          <div style={{ color: 'green' }}>
            <p>{uploadstatus}</p>
          </div>
        )}
        {uploadsuccess === false && (
          <div style={{ color: 'red' }}>
            <p>{uploadstatus}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddPost;
