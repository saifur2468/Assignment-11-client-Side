import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import loginlottie from "../../../../public/Login Leady.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../AuthSection/Authcontex"; 
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      Swal.fire({ 
        icon: "error", 
        title: "Validation Error", 
        text: errorMsg,
        confirmButtonColor: "#10B981" 
      });
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({ 
        icon: "success", 
        title: "Login Successful", 
        text: "Welcome back to your account!",
        confirmButtonColor: "#10B981" 
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Login Failed", 
        text: err.message,
        confirmButtonColor: "#EF4444" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({ 
        icon: "success", 
        title: "Logged in with Google!",
        confirmButtonColor: "#10B981" 
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Google Login Failed", 
        text: err.message,
        confirmButtonColor: "#EF4444" 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
        
        {/* Left Side - Lottie Animation */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-emerald-500/5 dark:bg-gray-800/40 p-10 h-full border-r border-gray-100 dark:border-gray-800">
          <div className="max-w-md w-full">
            <Lottie animationData={loginlottie} loop={true} />
          </div>
          <div className="text-center mt-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Empower Communities</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Log in to manage volunteer programs, events, and community drives effortlessly.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 sm:p-12 w-full">
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Please enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-3 text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 text-sm shadow-sm cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;