import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./HomePage.css"; // Add styling for Home page

const HomePage = () => {
  const location = useLocation();
  const userRole = location.state?.role; // Passed from login page

  // Cloud Animation
  const cloudVariants = {
    animate: {
      x: [0, 300, 0], // Move left and right
      y: [10, -20, 10], // Slight up and down movement
      opacity: [1, 0.8, 1],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 6,
        ease: "easeInOut",
      },
    },
  };

  // Flower Animation (Dancing Flower)
  const flowerVariants = {
    animate: {
      x: [0, 20, -20, 0], // Move side to side
      y: [0, -10, 0], // Slight upward movement
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  // Butterfly Animation (Flying Butterfly)
  const butterflyVariants = {
    animate: {
      x: [0, 200, 0], // Butterfly flying back and forth
      y: [0, -50, 0],
      opacity: [0, 1, 0], // Fluttering effect
      rotate: [0, 360], // Butterfly spinning
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="tree-container">
      {/* Moving Welcome Text */}
      <motion.h1
        className="welcome-text"
        animate={{
          rotate: [0, 2, -2, 0], // Light rotation
          y: [0, -8, 0], // Bouncing effect
          opacity: [1, 0.8, 1], // Fade-in and fade-out
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "easeInOut",
        }}
      >
        Welcome to KiddoKlass!
      </motion.h1>

      {/* Cloud Animation */}
      <motion.div className="cloud" variants={cloudVariants} animate="animate">
        ☁️
      </motion.div>
      <motion.div className="cloud2" variants={cloudVariants} animate="animate">
        ☁️
      </motion.div>

      {/* Flower Animation */}
      <motion.div className="flower" variants={flowerVariants} animate="animate">
        🌸
      </motion.div>

      {/* Butterfly Animation */}
      <motion.div
        className="butterfly"
        variants={butterflyVariants}
        animate="animate"
      >
        🦋
      </motion.div>

      {/* Role-based content */}
      <div className="role-based-content">
        {userRole === "admin" ? (
          <div>
            <h2>admin</h2>
            {/* Admin-specific content here */}
          </div>
        ) : (
          <div>
            <h2>User</h2>
            {/* User-specific content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
