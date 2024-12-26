import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-01-01T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeRemaining = targetDate - now;

      if (timeRemaining <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
      });
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">Countdown to 2025</h1>
      <div className="flex gap-4 text-center">
        <div>
          <p className="text-6xl font-bold">{timeLeft.days}</p>
          <span className="text-xl">Days</span>
        </div>
        <div>
          <p className="text-6xl font-bold">{timeLeft.hours}</p>
          <span className="text-xl">Hours</span>
        </div>
        <div>
          <p className="text-6xl font-bold">{timeLeft.minutes}</p>
          <span className="text-xl">Minutes</span>
        </div>
        <div>
          <p className="text-6xl font-bold">{timeLeft.seconds}</p>
          <span className="text-xl">Seconds</span>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
