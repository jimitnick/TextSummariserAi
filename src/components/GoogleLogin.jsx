import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User info:", user);
      alert(`Welcome, ${user.displayName}`);
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      alert("Google Sign-In failed.");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
    >
      Sign in with Google
    </button>
  );
}

export default GoogleLogin;
