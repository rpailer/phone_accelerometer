import React, { useState } from "react";
import useLongPress from "./useLongPress";

function App() {
  const [longPressCount, setlongPressCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const onLongPress = () => {
    console.log('longpress is triggered');
    setlongPressCount(longPressCount + 1);
  };

  const onRelease = () => {
    console.log('longpress is released');
    
  };

  const onClick = () => {
    console.log('click is triggered')
    setClickCount(clickCount + 1);
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onRelease, onClick, defaultOptions);

  return (
    <div className="App">
      <button {...longPressEvent}>use  Loooong  Press</button>
      <span>Long press count: {longPressCount}</span>
      <span>Click count: {clickCount}</span>
    </div>

  );
}

export default App;
