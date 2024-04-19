import React, { useState, useEffect } from 'react';

const ColorPicker = () => {
  const initialColor = '#000000';
  const [color, setColor] = useState(initialColor);
  const [copied, setCopied] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    setCopied(false);
  };

  const handleResetColor = () => {
    setColor(initialColor);
    setCopied(false);
    setResetConfirmation(true);
  };

  const handleCopyColor = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('colorChange', { detail: color }));
  }, [color]);

  useEffect(() => {
    let timeout;
    if (resetConfirmation) {
      timeout = setTimeout(() => {
        setResetConfirmation(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [resetConfirmation]);

  return (
    <div className='colorcontainer'>
      <label className='choose' htmlFor="colorPicker">Choose a color:</label>
      <input
        type="color"
        id="colorPicker"
        value={color}
        onChange={handleColorChange}
      />
      <div
        className='biginput'
        style={{ backgroundColor: color }}
        onClick={handleCopyColor}
      ></div>
      <div className='colorpreview' style={{ backgroundColor: color }}></div>
      <p className='selectedcolor'>Selected Color: {color}</p>
      <input
        className='textinput'
        type="text"
        value={color}
        onChange={handleColorChange}
        disabled={!copied}
      />
      <button className='resetbtn' onClick={handleResetColor}>Reset</button>
      {copied && <p className='copied'>Color Copied!</p>}
      {resetConfirmation && <p className='confirmation'>Color Reset!</p>}
    </div>
  );
};

export default ColorPicker;