/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ImageData {
  src: string;
  height: number;
  width: number;
}

function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const url = URL.createObjectURL(e.target.files[0]);
      const dimensions = new Image();
      dimensions.src = url;
      dimensions.onload = function () {
        setImageData({
          src: url,
          height: dimensions.height,
          width: dimensions.width,
        });
      };

      setClicked(true);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      if (videoRef?.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
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

  useEffect(() => {
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
  }, []);

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
        setImageData({
          src: dataUrl,
          width: video.videoWidth,
          height: video.videoHeight,
        });
        setClicked(true);
        stopCamera();
      }
    }
  };

  // const clearSelection = () => {
  //   setImageData(null);
  //   setCameraStream(null);
  //   setClicked(false);

  //   startCamera();
  // };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* <div>
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
      </div> */}

      {!clicked && cameraStream != null && (
        <video className="rounded-lg" ref={videoRef} autoPlay></video>
      )}

      {imageData && (
        <img
          src={imageData.src}
          alt="Captured"
          className="h-full max-h-[466px] rounded-lg"
        />
      )}
      <div className="flex w-full items-center justify-end gap-2">
        {cameraStream != null && !clicked && (
          <label
            htmlFor="file-upload"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
            )}
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
        )}
        {cameraStream != null && !clicked && (
          <Button onClick={captureImage}>Take picture</Button>
        )}

        {cameraStream != null && clicked && (
          <Link
            href={`/search/capture?${new URLSearchParams(
              imageData,
            ).toString()}`}
            className={cn(
              buttonVariants({
                variant: "default",
              }),
            )}
          >
            Proceed
          </Link>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}

export default CameraCapture;
