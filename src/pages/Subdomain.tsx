
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Subdomain = () => {
  const navigate = useNavigate();
  const targetIp = "192.81.217.151";

  useEffect(() => {
    // Redirect to the IP address
    window.location.href = `http://${targetIp}`;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="mb-4">You are being redirected to: <span className="font-mono">{targetIp}</span></p>
        <p className="text-sm text-gray-500">If you are not redirected automatically, please click the button below:</p>
        <a 
          href={`http://${targetIp}`}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to {targetIp}
        </a>
      </div>
    </div>
  );
};

export default Subdomain;
