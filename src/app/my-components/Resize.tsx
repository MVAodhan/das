"use client";

import Image from "next/image";
import { useState } from "react";

export default function Resize() {
  const [loading, setLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [removedBgURL, setRemovedBgURL] = useState("");

  const makeRequest = async function (e: any) {
    setLoading(true);
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.onloadend = async function () {
      let base64data = reader.result;
      const res = await fetch("/api/remove", {
        method: "POST",
        body: JSON.stringify({ image: base64data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.message !== "ok") {
        setErrorMessage(data.message);
      }

      setRemovedBgURL(() => data.data.image);
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const downloadImage = async () => {
    const response = await fetch(removedBgURL);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "removed.png";
    link.click();
    link.remove();
  };

  const downloadEmoji = async (e: any) => {
    let reader = new FileReader();

    reader.onloadend = async () => {
      let base64data = reader.result;
      const res = await fetch("/api/resize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: base64data,
        }),
      });

      const data = await res.json();

      // console.log(data.data);
      const bufferData = data.data;
      const blob = new Blob([new Uint8Array(bufferData)], {
        type: "image/png",
      });

      const url = URL.createObjectURL(blob);

      setRemovedBgURL(url);

      const link = document.createElement("a");
      link.href = url;
      link.download = "removed.png";
      link.click();
      link.remove();
    };

    downloadImage();
  };
  return (
    <main className="flex mt-10 flex-col items-center">
      <div className=" flex justify-center">
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={makeRequest}
        />
      </div>

      {loading && <span className="loading loading-dots loading-lg" />}
      {errorMessage && <span>{errorMessage}</span>}
      {removedBgURL && (
        <div className="flex flex-col items-center ">
          <Image
            src={removedBgURL}
            height={200}
            width={200}
            alt="image with removed background"
          />
          <div className="flex mt-5 gap-2">
            <button className="btn" onClick={downloadImage}>
              Download Image
            </button>
            <button className="btn" onClick={downloadEmoji}>
              Download Emoji
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
