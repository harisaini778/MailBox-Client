import React, { useState } from "react";
import { FaSync } from "react-icons/fa";
import { Button } from "react-bootstrap";

const Refresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  // Define the inline CSS for the spinning animation
  const spinStyle = {
    animation: isRefreshing ? "spin 2s linear infinite" : "none",
  };

  return (
    <div>
      <Button
        variant="light"
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="refresh-button"
      >
        <FaSync style={spinStyle} /> {/* Apply the inline style */}
      </Button>
    </div>
  );
};

export default Refresh;
