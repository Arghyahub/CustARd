/** @format */

import React, { ReactEventHandler, useState } from "react";
import nlp from "compromise";

interface forme {
  target: {
    textar: HTMLTextAreaElement;
  };
}

const OurOnlyProduct = [
  { name: "vaseline", category: "cream" },
  { name: "Boroline", category: "Cream" },
];

const Demo = ({ arLink }) => {
  return (
    <div className="flex flex-col w-full h-[45vh]">
      <div className="flex flex-row w-full h-full border">
        {/* Right box */}
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="sketchfab-embed-wrapper w-full h-full">
            <iframe
              className="w-full h-full"
              title="Vaseline"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              src={arLink}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
