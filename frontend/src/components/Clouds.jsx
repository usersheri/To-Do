import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";
import cloudImage from "../assets/images/cloud.webp";

const generateRandomClouds = (count) => {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 80}%`, // Random vertical position
    left: `${Math.random() * 100}%`, // Random starting horizontal position
    speed: Math.random() * (150 - 60) + 60, // Random speed (60s - 150s)
    size: Math.random() * (1.2 - 0.6) + 0.6, // Random size (60% - 120%)
    opacity: Math.random() * (0.9 - 0.5) + 0.5, // Random opacity (50% - 90%)
  }));
};

const Clouds = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    setClouds(generateRandomClouds(10));
  }, []);

  return (
    <div className="clouds">
      {clouds.map((cloud, index) => (
        <motion.img
          key={index}
          src={cloudImage}
          className="cloud"
          alt="cloud"
          initial={{ x: "100vw" }} // Start from right edge
          animate={{ x: "-100vw" }} // Move to left edge
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: cloud.speed, // Use random speed
          }}
          style={{
            position: "absolute",
            top: cloud.top,
            left: cloud.left,
            width: `${cloud.size * 200}px`, // Adjust width based on size
            opacity: cloud.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default Clouds;
