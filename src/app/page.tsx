"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [removedBgURL, setRemovedBgURL] = useState("");

  const makeRequest = async function (e: any) {
    setLoading(true);
    const file = e.target.files[0];
    setPreviewURL(URL.createObjectURL(file));
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

  const download = async () => {
    const response = await fetch(removedBgURL);
    // const response = await fetch("/image_emoji.png");

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    console.log(url);
    const link = document.createElement("a");
    link.href = url;
    link.download = "removed.png";
    link.click();
    link.remove();
  };

  const saveAndDownloadEmoji = async () => {
    const res = await fetch("./api/emoji", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        url: "https://replicate.delivery/pbxt/4J1D41xEg0oXIFISgbtJri3ffpVLsBzNRoBIsJmG1N5BmaDTA/out.png",
      }),
    });

    const data = await res.json();
    const blob = new Blob([data.resizedImg.data], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "emoji.png";
    link.click();
    link.remove();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="file"
        className="file-input w-full max-w-xs"
        onChange={makeRequest}
      />

      {removedBgURL && (
        <>
          <Image
            src={removedBgURL}
            height={200}
            width={200}
            alt="image with removed background"
          />
          <Image
            src={removedBgURL}
            height={128}
            width={128}
            alt="image with removed background"
          />
          <button className="btn" onClick={download}>
            Download Image
          </button>
          <button className="btn" onClick={saveAndDownloadEmoji}>
            Save and Download Emoji
          </button>
        </>
      )}
    </main>
  );
}
