import React from "react";

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

function Drawer({ isOpen, toggleDrawer }: DrawerProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <button
        className="absolute top-4 right-4 text-2xl"
        onClick={toggleDrawer}
      >
        &times;
      </button>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Drawer Title</h2>
        <p>Drawer content goes here.</p>
      </div>
    </div>
  );
}

export default Drawer;
