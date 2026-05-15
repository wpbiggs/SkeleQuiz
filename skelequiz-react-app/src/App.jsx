import React, { useState, useEffect } from 'react';

const bones = [
  { name: 'Skull', left: 150, top: 0, width: 130, height: 120 },
  { name: 'Clavicle', left: 150, top: 120, width: 130, height: 50 },
  { name: 'Sternum', left: 200, top: 170, width: 40, height: 130 },
  { name: 'Rib Cage', left: 120, top: 150, width: 200, height: 200 },
  { name: 'Pelvis', left: 150, top: 350, width: 150, height: 130 },
  { name: 'Humerus Left', left: 100, top: 200, width: 50, height: 200 },
  { name: 'Humerus Right', left: 280, top: 200, width: 50, height: 200 },
  { name: 'Radius/Ulna Left', left: 80, top: 400, width: 50, height: 220 },
  { name: 'Radius/Ulna Right', left: 300, top: 400, width: 50, height: 220 },
  { name: 'Femur Left', left: 150, top: 480, width: 50, height: 250 },
  { name: 'Femur Right', left: 240, top: 480, width: 50, height: 250 },
  { name: 'Tibia/Fibula Left', left: 150, top: 730, width: 50, height: 112 },
  { name: 'Tibia/Fibula Right', left: 240, top: 730, width: 50, height: 112 },
];

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [order, setOrder] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState(null);

  useEffect(() => startQuiz(), []);

  function startQuiz() {
    const shuffled = shuffle(bones);
    setOrder(shuffled);
    setCurrent(0);
    setScore(0);
    setFlash(null);
  }

  const target = current < order.length ? order[current] : null;

  function handleClick(boneName) {
    if (!target) return;
    if (boneName === target.name) {
      setScore((prev) => prev + 1);
      setCurrent((prev) => prev + 1);
      setFlash({ name: boneName, type: 'correct' });
    } else {
      setFlash({ name: boneName, type: 'incorrect' });
    }
    setTimeout(() => setFlash(null), 500);
  }

  function skip() {
    if (current < order.length) setCurrent((prev) => prev + 1);
  }

  return (
    <div style={{ margin: '20px' }}>
      <h1>SkeleQuiz</h1>
      <p>
        {target ? (
          <>
            Click the highlighted bone: <strong>{target.name}</strong>
          </>
        ) : (
          'Quiz complete!'
        )}
      </p>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Human_skeleton_front_numbered.svg"
          alt="Human Skeleton"
          width="436"
          height="842"
        />
        {bones.map((bone) => {
          let className = 'hotspot';
          if (flash && flash.name === bone.name) className += ' ' + flash.type;
          return (
            <div
              key={bone.name}
              className={className}
              style={{
                position: 'absolute',
                left: bone.left,
                top: bone.top,
                width: bone.width,
                height: bone.height,
                cursor: 'pointer',
              }}
              onClick={() => handleClick(bone.name)}
            />
          );
        })}
      </div>
      <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
        Score: {score} / {order.length}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={skip} style={{ marginRight: '10px' }}>
          Skip
        </button>
        <button onClick={startQuiz}>Restart</button>
      </div>
    </div>
  );
}
