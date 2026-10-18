import React, { useState } from "react";
import Lottie from "lottie-react";
import signupfron from "../../../../public/register.json";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../AuthSection/Authcontex";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, User, Image as ImageIcon, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Password validation
  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      Swal.fire({ icon: "error", title: "Validation Error", text: errorMsg, confirmButtonColor: "#10B981" });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Passwords do not match", confirmButtonColor: "#EF4444" });
      return;
    }

    setLoading(true);
    try {
      // 1. Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Update profile with Name and Photo URL if provided
      if (name || photoURL) {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photoURL
        });
      }

      Swal.fire({ 
        icon: "success", 
        title: "Account Created!", 
        text: "Welcome! Explore more routes or check your profile.", 
        confirmButtonColor: "#10B981" 
      });
      navigate("/");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Signup Failed", text: err.message, confirmButtonColor: "#EF4444" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({ icon: "success", title: "Logged in with Google!", confirmButtonColor: "#10B981" });
      navigate("/");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Google Login Failed", text: err.message, confirmButtonColor: "#EF4444" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
        
        {/* Left Side - Lottie Animation */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-emerald-500/5 dark:bg-gray-800/40 p-10 h-full border-r border-gray-100 dark:border-gray-800">
          <div className="max-w-md w-full">
            <Lottie animationData={signupfron} loop={true} />
          </div>
          <div className="text-center mt-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Join Our Mission</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Create an account to connect with communities and participate in impactful volunteer initiatives.
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-8 sm:p-12 w-full">
          <div className="text-center lg:text-left mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Join our community and start making a difference today!
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            
            {/* Name Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                  required 
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                  required 
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL (Optional)</label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="url" 
                  placeholder="https://example.com/photo.jpg" 
                  value={photoURL} 
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                  required 
                />
              </div>
            </div>

            {/* Signup Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-3 text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Google Signup */}
          <button 
            type="button" 
            onClick={handleGoogleLogin} 
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 text-sm shadow-sm cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;