import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";

function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageData(URL.createObjectURL(e.target.files[0]));
      setClicked(true);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const startCamera = () => {
    const findMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    void findMediaDevices();
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/png");
        setImageData(dataUrl);
        setClicked(true);
        stopCamera();
      }
    }
  };

  return (
    <div>
      <div className="col-span-full">
        <div className="mt-2 flex flex-col justify-center gap-4 rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="flex justify-center">
            <div className="text-center">
              <Icons.image className="mx-auto h-12 w-12 text-gray-300" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleChange}
                  />
                </label>
                <p className="pl-1">from your computer</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          <div className="text-center">OR</div>
          <div className="flex flex-col items-center justify-center">
            <Icons.camera className="mx-auto h-12 w-12 text-gray-300" />
            <div className="mt-4 flex flex-col items-center">
              {cameraStream == null && !clicked && (
                <Button variant="outline" onClick={startCamera}>
                  Open camera
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {cameraStream != null && !clicked && (
        <button onClick={captureImage}>Capture Image</button>
      )}
      <br />
      {!clicked && <video ref={videoRef} autoPlay></video>}
      <br />
      {imageData && <img src={imageData} alt="Captured" />}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}

export default CameraCapture;
