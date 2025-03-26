
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Subdomain = () => {
  const navigate = useNavigate();
  const targetIp = "192.81.217.151";
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    // Set a timeout to redirect after 30 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = `http://${targetIp}`;
    }, 30000);

    // Create a countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup the timers on component unmount
    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Redirecting in {countdown} seconds</h1>
        <p className="mb-4 text-gray-700">You will be redirected to: <span className="font-mono text-gray-700">project-test</span></p>
        <p className="text-sm text-gray-600">If you are not redirected automatically, please click the button below:</p>
        <a 
          href={`http://${targetIp}`}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to project-test
        </a>
      </div>
    </div>
  );
};

export default Subdomain;
