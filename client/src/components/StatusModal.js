import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";
import { BiMinus, BiTrash, BiImageAdd } from "react-icons/bi";
import { imageShowModal, videoShowModal } from "../utils/mediaShowModal";

const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [contentsub, setContentsub] = useState("");
  const [community, setCommunity] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) {
        return (err = "File does not exist.");
      }
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Image size must be less than 5 mb.");
      }
      return newImages.push(file);
    });
    if (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (images.length === 0) {
    //   return dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: "Add image(s)." },
    //   });
    // }

    if (status.onEdit) {
      dispatch(
        updatePost({ content, contentsub, community, images, auth, status })
      );
    } else {
      dispatch(
        createPost({ content, contentsub, community, images, auth, socket })
      );
    }

    setContent("");
    setContentsub("");
    setCommunity("");
    setImages([]);
    if (tracks) {
      tracks.stop();
    }
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false,
    });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setContentsub(status.contentsub);
      setCommunity(status.community);
      setImages(status.images);
    }
  }, [status]);
  console.log(images);

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            <BiMinus />
          </span>
        </div>
        <div className="status_body">
          <div>
            <textarea
              onChange={(e) => setCommunity(e.target.value)}
              value={community}
              name="community"
              placeholder="Community"
              style={{
                filter: theme ? "invert(1)" : "invert(0)",
                color: theme ? "white" : "#111",
                background: theme ? "rgb(0,0,0,0.3)" : "",
              }}
            />
          </div>
          <div className="status_body-block">
            <div className="status_body-box">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                name="content"
                placeholder="Content title"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
              {images.map((img, index) => (
                <div key={index} className="file_img">
                  {index == 0 ? (
                    <>
                      <div>
                        {img.type.match(/video/i)
                          ? videoShowModal(URL.createObjectURL(img, theme))
                          : imageShowModal(URL.createObjectURL(img, theme))}
                      </div>
                      <div>
                        <span onClick={() => deleteImages(0)}>
                          <BiTrash />
                        </span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              <div className="input_images">
                {stream ? (
                  <i className="fas fa-camera" onClick={handleCapture} />
                ) : (
                  <>
                    <div className="file_upload">
                      <BiImageAdd />
                      <input
                        onChange={handleChangeImages}
                        type="file"
                        name="file"
                        id="file"
                        multiple
                        accept="image/*,video/*"
                      />
                      {/* {images ? <a>{images[0].name}</a> : <></>} */}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="status_body-box">
              <textarea
                onChange={(e) => setContentsub(e.target.value)}
                value={contentsub}
                name="contentsub"
                placeholder="Content title"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
              {images.map((img, index) => (
                <div key={index} className="file_img">
                  {index == 1 ? (
                    <>
                      <div>
                        {img.type.match(/video/i)
                          ? videoShowModal(URL.createObjectURL(img, theme))
                          : imageShowModal(URL.createObjectURL(img, theme))}
                      </div>
                      <div>
                        <span onClick={() => deleteImages(1)}>
                          <BiTrash />
                        </span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}

              {/* {images.map((img, index) => (
            <div key={index} className="file_img">
              {img.camera ? (
                imageShowModal(img.camera, theme)
              ) : img.url ? (
                <>
                  {img.url.match(/video/i)
                    ? videoShowModal(img.url)
                    : imageShowModal(img.url)}
                </>
              ) : (
                <>
                  {img.type.match(/video/i)
                    ? videoShowModal(URL.createObjectURL(img, theme))
                    : imageShowModal(URL.createObjectURL(img, theme))}
                </>
              )}
              <span onClick={() => deleteImages(index)}>&times;</span>
            </div>
          ))} */}
              <div className="input_images">
                <div className="file_upload">
                  <BiImageAdd />
                  <input
                    onChange={handleChangeImages}
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                  />
                  {/* {images ? <a>{images[1].name}</a> : <></>} */}
                </div>
              </div>
            </div>

            {/* <div className="show_images">
            {images.map((img, index) => (
              <div key={index} className="file_img">
                {img.camera ? (
                  imageShowModal(img.camera, theme)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShowModal(img.url)
                      : imageShowModal(img.url)}
                  </>
                ) : img[0] ? (
                  <>yes</>
                ) : img[1] ? (
                  <>no</>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShowModal(URL.createObjectURL(img, theme))
                      : imageShowModal(URL.createObjectURL(img, theme))}
                  </>
                )}
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div> */}
            {/* {stream && (
            <div className="stream position-relative">
              <video
                width="100%"
                height="100%"
                ref={videoRef}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                autoPlay
                muted
              />

              <span onClick={handleStopStream}>&times;</span>
              <canvas style={{ display: "none" }} ref={refCanvas} />
            </div>
          )} */}
            {/* <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />
                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    onChange={handleChangeImages}
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                  />
                </div>
              </>
            )}
          </div> */}
          </div>
        </div>
        <div className="status_footer">
          <button type="submit" className="create-button">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
