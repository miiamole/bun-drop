import React, { useEffect, useState } from "react";  //CodaAlong med BroCode för att skapa en klocka -> React Full Course for free (2024) 
                                                     // sen chatGPT ändrat det till en nedräknande klocka
function DeliveryTime() {
  const getRandomTime = () => Math.floor(Math.random() * 36) + 10; // Ger ett nummer mellan 10 och 45

  const [timeLeft, setTimeLeft] = useState(getRandomTime() * 60); // Konverterar till sekunder

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${padZero(minutes)}:${padZero(secs)}`;
  }
  // gör så att det blir 0 innan enkla siffor, ex 01.
  function padZero(number) {
    return (number < 10 ? "0" : "") + number;
  }

  return (
    <>
      <div className="delivery-text">
        <h2 className="delivery-time-text">Estimated time to delivery:</h2>

        <div className="clock-container">
          <div className="clock">
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryTime;

