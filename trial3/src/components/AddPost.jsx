import React, { useState } from 'react';

const AddPost = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [category, setCategory] = useState('NEW');
    const [postTitle, setPostTitle] = useState('');
    const [poster, setPoster] = useState('Irush');
    const [postSummary, setPostSummary] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0); // New state for upload progress
    const [uploadsuccess, setUploadsuccess] = useState(false); // New state for upload progress
    const [showOverlay, setShowOverlay] = useState(false);
    const preventDefault = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    const handleDrop = (e) => {
      preventDefault(e);
  
      const file = e.dataTransfer.files[0];
      if (file) {
        setImage(file);
        previewFile(file);
      }
    };
  
    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        previewFile(file);
      }
    };
  
    const previewFile = (file) => {
      const reader = new FileReader();
  
      reader.addEventListener('load', () => {
        setPreview(reader.result);
      });
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    const submitForm = () => {
      setShowOverlay(true)
      const formData = new FormData();
      formData.append('image', image);
      formData.append('category', category);
      formData.append('postTitle', postTitle);
      formData.append('poster', poster);
      formData.append('postSummary', postSummary);
  
      // Manually submit the form using JavaScript with progress tracking
      fetch('https://posts-back.onrender.com/api/new', {
        method: 'POST',
        body: formData,
        // Track progress
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      })
        .then((response) => {
          // Handle the response as needed
          console.log(response);
          // Reset progress after completion
          setUploadProgress(0);
          setShowOverlay(false)
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          // Reset progress after error
          setUploadProgress(0);
          setShowOverlay(false)
          setUploadsuccess(true)
          setTimeout(() => setUploadsuccess(false), 5000)
        });
    };
  
    return (
      <div className="add-post-container">
        {showOverlay && uploadProgress > 0 && (
          <div id='overlay' >
             <div className="progress-bar-container">
                <label htmlFor="file">Uploading Post:</label>
                <br/>
                <progress id="file" value={uploadProgress} max="100">
                  {uploadProgress}%
                </progress>
                {uploadProgress}%
              </div>

          </div>
      )}
      <svg width={500} height={100} >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#7f00ff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e100ff', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
  
      <text style={{ fill: 'url(#grad)', fontSize: 45, textAnchor:'middle'}} x={250} y={40}>
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
            <p>Click or Drag & Drop your image here</p>
          </div>
          <input
            type="file"
            name="image"
            id="fileInput"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          {preview && <img src={preview} alt="Preview" className="preview-image" />}
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <br/>
          <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="NEW">NEW 🔥</option>
              <option value="MY FAMILY">MY FAMILY</option>
              <option value="SPORTS">SPORTS</option>
              <option value="HOBBIES">HOBBIES</option>
              <option value="SONGS">SONGS</option>
              <option value="VIDEOS">VIDEOS</option>
            </select>

          <br/>
          <label htmlFor="poster">Poster:</label>
          <input
            type="text"
            name="poster"
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
          <br/>
          <label htmlFor="postSummary">Post Summary:</label>
          <textarea
            name="postSummary"
            id="postSummary"
            value={postSummary}
            onChange={(e) => setPostSummary(e.target.value)}
          ></textarea>
          <br/>
          <div className='post-button-area'>
          <button type="button" onClick={submitForm} className="post-button">
            Post
          </button>
          </div>
          {uploadsuccess && (
              <div style={{color:'green'}}>
                <p>Upload Success!!</p>
              </div>
            )}

        </form>
      </div>
    );
  };
  
  export default AddPost;
