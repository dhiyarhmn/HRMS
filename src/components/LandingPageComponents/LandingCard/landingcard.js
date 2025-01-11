"use client";

import React from "react";
import { Card } from "antd";
import Image from "next/image";

const { Meta } = Card;

const LandingCard = ({ title, description, imageUrl, className }) => (
  <Card
    hoverable
    cover={
      <Image
        alt="example"
        src={imageUrl}
        unoptimized
        className="object-contain w-40 h-40 p-1"
      />
    }
    className={`w-60 h-auto hover:scale-110 transition-all duration-300 ease-in-out divide-y-2 ${className}`}
  >
    <Meta
      title={title || "Default Title"}
      description={description || "Default Description"}
    />
  </Card>
);

export default LandingCard;