import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router';

function GoogleLogin() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      alert("Google Sign-In failed.");
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition cursor-pointer"
    >
      Sign in with Google
    </button>
  );
}

export default GoogleLogin;
