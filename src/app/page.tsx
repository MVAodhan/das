"use client";
import Image from "next/image";
import { useState } from "react";
import Nav from "./componsents/Nav";

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
      console.log(data);
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

  return (
    <>
      <Nav />
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
            <button className="btn" onClick={downloadImage}>
              Download Image
            </button>
            <button className="btn" onClick={downloadImage}>
              Save Image
            </button>
          </>
        )}
      </main>
    </>
  );
}
