body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #fff0f5;
  margin: 0;
  padding: 0;
}

.page {
  padding: 50px 20px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color: #ffb6c1;
  border: none;
  border-radius: 10px;
  transition: 0.3s;
}
button:hover {
  background-color: #ff69b4;
}

#game-area {
  position: relative;
  width: 90%;
  max-width: 600px;
  height: 400px;
  border: 3px solid #8b4513;
  margin: 20px auto;
  overflow: hidden;
  background-color: #fff8dc;
  border-radius: 15px;
  touch-action: none;
}

#catcher {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 50px;
}

.chocolate {
  position: absolute;
  font-size: 35px;
}

.final-text {
  animation: pop 1s ease-in-out forwards;
}

@keyframes pop {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.5); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
