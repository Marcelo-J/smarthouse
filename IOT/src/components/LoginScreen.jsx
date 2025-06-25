import React, { useState } from 'react';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('Invalid email or password');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Invalid email or password');
    } else {
      setError('');
      // Add login logic here (e.g., redirect to dashboard)
      console.log('Logged in with', email);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.09-.647.35-1.088.636-1.338-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.544 1.377.202 2.394.099 2.647.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.482C17.137 18.166 20 14.418 20 10c0-5.52-4.48-10-10-10z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to continue</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
          </div>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Log in
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Or continue with</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.9H7v-3h3V9c0-2.69 2.02-4.93 4.53-4.93c1.28 0 2.37.24 2.37.24v2.6h-1.33c-1.31 0-1.72.81-1.72 1.64v2h2.93l-.47 3h-2.46v6.9c4.56-.93 8-4.96 8-9.8c0-5.52-4.48-10-10-10z" />
              </svg>
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.9H7v-3h3V9c0-2.69 2.02-4.93 4.53-4.93c1.28 0 2.37.24 2.37.24v2.6h-1.33c-1.31 0-1.72.81-1.72 1.64v2h2.93l-.47 3h-2.46v6.9c4.56-.93 8-4.96 8-9.8c0-5.52-4.48-10-10-10z" />
              </svg>
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.9H7v-3h3V9c0-2.69 2.02-4.93 4.53-4.93c1.28 0 2.37.24 2.37.24v2.6h-1.33c-1.31 0-1.72.81-1.72 1.64v2h2.93l-.47 3h-2.46v6.9c4.56-.93 8-4.96 8-9.8c0-5.52-4.48-10-10-10z" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;