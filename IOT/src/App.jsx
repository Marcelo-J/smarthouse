import React, { useState, useEffect, useCallback } from 'react';
import {
  Home,
  Lightbulb,
  Camera,
  Fan,
  DoorOpen,
  Shield,
  Settings,
  BarChart3,
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Bell,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Custom Message Box Component
const MessageBox = ({ type, message, onClose, onConfirm, onCancel }) => {
  const bgColor = type === 'success' ? 'bg-green-50' : 
                  type === 'error' ? 'bg-red-50' : 
                  type === 'warning' ? 'bg-yellow-50' : 
                  'bg-gray-50';
                  
  const textColor = type === 'success' ? 'text-green-800' : 
                    type === 'error' ? 'text-red-800' : 
                    type === 'warning' ? 'text-yellow-800' : 
                    'text-gray-800';
                    
  const borderColor = type === 'success' ? 'border-green-200' : 
                      type === 'error' ? 'border-red-200' : 
                      type === 'warning' ? 'border-yellow-200' : 
                      'border-gray-200';

  // Icon based on type
  const getIcon = () => {
    switch(type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
      <div className={`max-w-md mx-4 p-6 rounded-lg border ${bgColor} ${borderColor} shadow-lg`}>
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 ${textColor}`}>
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className={`text-sm font-medium ${textColor}`}>
              {message}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          {type === 'confirm' ? (
            <>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Login Component
// API configuration
const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this to your backend URL

// API helper functions
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};



// User storage utilities
const userStorage = {
  setUser: (userData) => {
    const userInfo = {
      user: userData.user,
      token: userData.token,
      loginTime: new Date().toISOString()
    };
    // Using in-memory storage for Claude environment
    window.currentUser = userInfo;
  },
  
  getUser: () => {
    return window.currentUser || null;
  },
  
  removeUser: () => {
    window.currentUser = null;
  },
  
  isLoggedIn: () => {
    const user = window.currentUser;
    return user && user.token;
  }
};

// Message Box Component
// const MessageBox = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
//       <div className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm ${
//         type === 'success' 
//           ? 'bg-green-50 border border-green-200 text-green-800'
//           : 'bg-red-50 border border-red-200 text-red-800'
//       }`}>
//         {type === 'success' ? (
//           <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
//         ) : (
//           <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
//         )}
//         <span className="text-sm font-medium">{message}</span>
//         <button
//           onClick={onClose}
//           className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600"
//         >
//           <X className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// Login Component
const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [messageBox, setMessageBox] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setMessageBox({ type: 'error', message: 'Please enter email and password.' });
      return;
    }

    setIsLoading(true);

    const result = await onLogin(formData);
    
    if (result.success) {
      setMessageBox({ type: 'success', message: result.message });
    } else {
      setMessageBox({ type: 'error', message: result.message });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SmartHome</h1>
          <p className="text-gray-600 mt-2">Welcome back!</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      
      {messageBox && (
        <MessageBox
          type={messageBox.type}
          message={messageBox.message}
          onClose={() => setMessageBox(null)}
        />
      )}
    </div>
  );
};

// Register Component
const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [messageBox, setMessageBox] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessageBox({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessageBox({ type: 'error', message: 'Passwords do not match!' });
      return;
    }

    setIsLoading(true);

    const result = await onRegister(formData);
    
    if (result.success) {
      setMessageBox({ type: 'success', message: result.message });
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } else {
      setMessageBox({ type: 'error', message: result.message });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SmartHome</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
      
      {messageBox && (
        <MessageBox
          type={messageBox.type}
          message={messageBox.message}
          onClose={() => setMessageBox(null)}
        />
      )}
    </div>
  );
};

// Notification Dropdown Component
const NotificationDropdown = ({ notifications, isOpen, onClose, onMarkAsRead, appTheme }) => {
  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 top-12 w-80 rounded-lg shadow-xl border z-50 ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white'}`}>
      <div className={`p-4 border-b ${appTheme === 'dark' ? 'border-gray-600' : ''}`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
          <button
            onClick={onClose}
            className={`text-gray-400 hover:text-gray-600 ${appTheme === 'dark' ? 'text-gray-300 hover:text-white' : ''}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className={`p-4 text-center ${appTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                !notification.read ? (appTheme === 'dark' ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-50') : (appTheme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-50')
              } ${appTheme === 'dark' ? 'border-gray-600' : ''}`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  !notification.read ? (appTheme === 'dark' ? 'bg-blue-800' : 'bg-blue-100') : (appTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-100')
                }`}>
                  <Mail className={`w-4 h-4 ${
                    !notification.read ? 'text-blue-600' : (appTheme === 'dark' ? 'text-gray-300' : 'text-gray-400')
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    !notification.read ? (appTheme === 'dark' ? 'text-white' : 'text-gray-900') : (appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600')
                  }`}>
                    {notification.title}
                  </p>
                  <p className={`text-sm ${appTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {notification.message}
                  </p>
                  <p className={`text-xs ${appTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mt-2`}>
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {notifications.some(n => !n.read) && (
        <div className={`p-3 border-t ${appTheme === 'dark' ? 'border-gray-600' : ''}`}>
          <button
            onClick={() => notifications.forEach(n => onMarkAsRead(n.id))}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

// Device Card Component
const DeviceCard = ({ device, onToggle, onCameraClick, appTheme }) => {
  const getDeviceIcon = (type) => {
    switch (type) {
      case 'security-light': return Shield;
      case 'light': return Lightbulb;
      case 'fan': return Fan;
      case 'door': return DoorOpen;
      case 'camera': return Camera;
      case 'sensor': return RefreshCw; // Using RefreshCw for generic sensor icon (like Ultrasonic)
      case 'other': return Plus; // Generic icon for 'Add Device X'
      default: return Home;
    }
  };

  const Icon = getDeviceIcon(device.type);

  // Determine button text and color based on device type and isOn state
  const getButtonState = (device) => {
    if (device.type === 'door') {
      return {
        text: device.isOn ? 'OPEN' : 'CLOSED',
        className: device.isOn ? 'bg-red-600 hover:bg-red-700 text-white' : (appTheme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700')
      };
    } else if (device.type === 'light' || device.type === 'fan' || device.type === 'camera' || device.type === 'sensor' || device.type === 'other') {
      return { // 'other' type for 'Add Device X'
        text: device.isOn ? 'ON' : 'OFF',
        className: device.isOn ? 'bg-green-600 hover:bg-green-700 text-white' : (appTheme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700')
      };
    }
    return { text: '', className: '' }; // Fallback
  };

  const { text: buttonText, className: buttonClass } = getButtonState(device);

  return (
    <div className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${appTheme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${device.online ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <Icon className={`w-6 h-6 ${device.online ? 'text-blue-600' : 'text-gray-400'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{device.name}</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${device.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${device.online ? 'text-green-600' : 'text-red-600'}`}>
                {device.online ? 'online' : 'offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on device type for control/display */}
        {device.type === 'security-light' ? (
          <span className={`px-4 py-2 rounded-lg font-medium ${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {device.isOn ? 'ON (Night)' : 'OFF (Day)'}
          </span>
        ) : device.type === 'camera' ? ( // Camera now has ON/OFF toggle, and "View Live" only if ON
          <button
            onClick={() => {
              if (device.isOn) { // If camera is ON, clicking acts as "View Live"
                onCameraClick(device);
              } else { // If camera is OFF, clicking acts as "Turn ON"
                onToggle(device.id);
              }
            }}
            className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${buttonClass}`}
          >
            {device.isOn ? 'VIEW LIVE' : 'TURN ON'}
          </button>
        ) : ( // All other toggleable devices (light, fan, door, sensor, other)
          <button
            onClick={() => onToggle(device.id)}
            className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${buttonClass}`}
          >
            {buttonText}
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className={`${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Usage</span>
          <span className="font-medium">{device.usage}%</span>
        </div>
        <div className={`w-full rounded-full h-2 ${appTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${device.usage}%` }}
          ></div>
        </div>
        <p className={`text-sm ${appTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Updated {device.lastUpdated}</p>
      </div>
    </div>
  );
};

// Live Camera Component
const LiveCamera = ({ device, onClose, appTheme }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${appTheme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
        <div className={`flex items-center justify-between p-4 border-b ${appTheme === 'dark' ? 'border-gray-700' : ''}`}>
          <h2 className={`text-xl font-semibold ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{device.name} - Live Feed</h2>
          <button
            onClick={onClose}
            className={`text-gray-400 hover:text-gray-600 text-2xl ${appTheme === 'dark' ? 'text-gray-300 hover:text-white' : ''}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Only show simulated feed if device is actually ON */}
        {device.isOn ? (
          <div className="relative bg-gray-900 aspect-video">
            {/* Simulated camera feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Live Camera Feed (Simulated)</p>
                <p className="text-sm opacity-75">Camera: {device.name}</p>
                <p className="text-sm opacity-75">Status: {device.online ? 'Online' : 'Offline'}</p>
                
                {/* Simulated live indicator */}
                <div className="flex items-center justify-center mt-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm">LIVE</span>
                </div>
              </div>
            </div>
            
            {/* Camera controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-black bg-opacity-50 rounded-lg p-2 flex space-x-2">
                <button className="text-white hover:text-blue-400 p-2">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative bg-gray-900 aspect-video flex items-center justify-center text-gray-400 text-center">
            <p>Camera is currently OFF. Please turn it ON to view feed.</p>
          </div>
        )}
        
        <div className={`p-4 ${appTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className={`grid grid-cols-2 gap-4 text-sm ${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <div>
              <span className="text-gray-600">Resolution:</span>
              <span className="ml-2 font-medium">1920x1080</span>
            </div>
            <div>
              <span className="text-gray-600">Frame Rate:</span>
              <span className="ml-2 font-medium">30 FPS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- New Components for Modals ---

const ModalWrapper = ({ title, onClose, children, appTheme }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className={`rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden ${appTheme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
      <div className={`flex items-center justify-between p-4 border-b ${appTheme === 'dark' ? 'border-gray-700' : ''}`}>
        <h2 className={`text-xl font-semibold ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        <button
          onClick={onClose}
          className={`text-gray-400 hover:text-gray-600 ${appTheme === 'dark' ? 'text-gray-300 hover:text-white' : ''}`}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
);

const AddNewDeviceModal = ({ onClose, onAddDevice, appTheme, nextGenericDeviceId }) => {
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'other', // Default to 'other' type for these generic devices
    serialNumber: '',
    isOn: false,
    usage: 0,
    lastUpdated: 'Just now'
  });
  const [messageBox, setMessageBox] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (newDevice.name && newDevice.type) {
      if (nextGenericDeviceId === null) {
        setMessageBox({type: 'error', message: 'No more generic "Add Device" slots available on ESP.'});
        return;
      }
      onAddDevice({ ...newDevice, id: nextGenericDeviceId, online: newDevice.isOn }); 
      setMessageBox({ type: 'success', message: `Device "${newDevice.name}" added successfully!` });
      onClose(); // Close modal after successful add
    } else {
      setMessageBox({ type: 'error', message: 'Please fill in device name and type.' });
    }
  };

  return (
    <ModalWrapper title="Add New Device" onClose={onClose} appTheme={appTheme}>
      <div className="space-y-6">
        <p className={`${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Fill in the details below to add a new smart device to your SmartHome system.</p>
        
        {nextGenericDeviceId === null && (
          <div className="text-red-500 text-sm font-semibold p-3 border border-red-300 rounded-lg bg-red-50">
            All generic "Add Device" slots on ESP are currently in use.
          </div>
        )}

        <div>
          <label htmlFor="deviceName" className={`block text-sm font-medium ${appTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Device Name</label>
          <input
            type="text"
            id="deviceName"
            name="name"
            value={newDevice.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
            placeholder="e.g., Garage Light"
            required
            disabled={nextGenericDeviceId === null}
          />
        </div>
        
        {/* Device Type for dynamically added devices will be 'other' */}
        <div>
          <label htmlFor="deviceType" className={`block text-sm font-medium ${appTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Device Type</label>
          <select
            id="deviceType"
            name="type"
            value={newDevice.type}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            required
            disabled={nextGenericDeviceId === null}
          >
            <option value="other">Generic Device</option>
            {/* Other types are fixed and pre-defined, not dynamically added this way */}
          </select>
        </div>
        
        <div>
          <label htmlFor="serialNumber" className={`block text-sm font-medium ${appTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Serial Number (Optional)</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={newDevice.serialNumber}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
            placeholder="Enter device serial number"
            disabled={nextGenericDeviceId === null}
          />
        </div>
        
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          disabled={nextGenericDeviceId === null}
        >
          Add Device
        </button>
      </div>
      {messageBox && (
        <MessageBox
          type={messageBox.type}
          message={messageBox.message}
          onClose={() => setMessageBox(null)}
        />
      )}
    </ModalWrapper>
  );
};

const ViewAnalyticsModal = ({ onClose, appTheme }) => {
  return (
    <ModalWrapper title="SmartHome Analytics" onClose={onClose} appTheme={appTheme}>
      <div className="space-y-6">
        <p className={`${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Gain insights into your device usage and energy consumption over time.</p>
        
        {/* Energy Consumption */}
        <div className={`border rounded-lg p-4 ${appTheme === 'dark' ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
          <h3 className={`font-semibold ${appTheme === 'dark' ? 'text-blue-200' : 'text-blue-800'} mb-2`}>Energy Consumption Overview</h3>
          <p className={`${appTheme === 'dark' ? 'text-blue-300' : 'text-blue-700'} text-sm`}>
            <span className="font-bold">Monthly Usage:</span> 150 kWh (estimated)
          </p>
          <p className={`${appTheme === 'dark' ? 'text-blue-300' : 'text-blue-700'} text-sm`}>
            <span className="font-bold">Cost:</span> $22.50 (estimated at $0.15/kWh)
          </p>
          <div className={`h-40 rounded-lg flex items-center justify-center text-gray-500 mt-4 border border-dashed ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
            [ Placeholder for a D3.js or Recharts Line Chart: Daily/Weekly Energy Usage ]
          </div>
          <p className={`text-xs ${appTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mt-2`}>Data last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
        </div>

        {/* Device Activity */}
        <div className={`border rounded-lg p-4 ${appTheme === 'dark' ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'}`}>
          <h3 className={`font-semibold ${appTheme === 'dark' ? 'text-green-200' : 'text-green-800'} mb-2`}>Top 5 Most Active Devices (Past 24h)</h3>
          <ul className={`${appTheme === 'dark' ? 'text-green-300' : 'text-green-700'} text-sm space-y-1`}>
            <li className="flex justify-between"><span>Security Light:</span> <span className="font-bold">25 activations</span></li>
            <li className="flex justify-between"><span>Living Room Light:</span> <span className="font-bold">12 hours ON</span></li>
            <li className="flex justify-between"><span>Front Door:</span> <span className="font-bold">8 open/close cycles</span></li>
            <li className="flex justify-between"><span>Ceiling Fan:</span> <span className="font-bold">6 hours ON</span></li>
            <li className="flex justify-between"><span>Live Camera:</span> <span className="font-bold">4 hours live stream</span></li>
          </ul>
          <div className={`h-40 rounded-lg flex items-center justify-center text-gray-500 mt-4 border border-dashed ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
            [ Placeholder for a Bar Chart: Device Activity ]
          </div>
        </div>

        {/* Security Events */}
        <div className={`border rounded-lg p-4 ${appTheme === 'dark' ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'}`}>
          <h3 className={`font-semibold ${appTheme === 'dark' ? 'text-red-200' : 'text-red-800'} mb-2`}>Security Events Summary (Past 7 days)</h3>
          <ul className={`${appTheme === 'dark' ? 'text-red-300' : 'text-red-700'} text-sm space-y-1`}>
            <li className="flex justify-between"><span>Motion Detected (Front Yard):</span> <span className="font-bold">3 alerts</span></li>
            <li className="flex justify-between"><span>Unauthorized Access Attempt (Back Door):</span> <span className="font-bold">1 alert</span></li>
          </ul>
          <p className={`text-xs ${appTheme === 'dark' ? 'text-red-400' : 'text-red-600'} mt-2`}>Review security logs for more details.</p>
        </div>

        <p className={`${appTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>This section provides a summary. For advanced analytics and custom reports, please visit the full web portal (future feature).</p>
      </div>
    </ModalWrapper>
  );
};

// New ChangePasswordModal component
const ChangePasswordModal = ({ onClose, appTheme }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [messageBox, setMessageBox] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setMessageBox({ type: 'error', message: 'New passwords do not match!' });
      return;
    }
    // Simulate password change logic
    // In a real app, you would send passwords to a backend for validation and update
    if (passwords.currentPassword && passwords.newPassword) {
      setMessageBox({ type: 'success', message: 'Password changed successfully!' });
      setPasswords({ // Clear form
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      // onClose(); // Optionally close after successful change
    } else {
      setMessageBox({ type: 'error', message: 'Please fill in all password fields.' });
    }
  };

  return (
    <ModalWrapper title="Change Password" onClose={onClose} appTheme={appTheme}>
      <div className="space-y-6">
        <p className={`${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Update your account password for enhanced security.</p>

        <div>
          <label htmlFor="currentPassword" className={`block text-sm font-medium ${appTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Current Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
              placeholder="Enter current password"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="newPassword" className={`block text-sm font-medium ${appTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
              placeholder="Enter new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmNewPassword" className={`block text-sm font-medium ${appTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmNewPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
              placeholder="Confirm new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
        >
          Change Password
        </button>
      </div>
      {messageBox && (
        <MessageBox
          type={messageBox.type}
          message={messageBox.message}
          onClose={() => setMessageBox(null)}
        />
      )}
    </ModalWrapper>
  );
};


// Settings Modal Component
const SettingsModal = ({ onClose, appTheme, toggleTheme, setShowChangePasswordModal }) => {
  return (
    <ModalWrapper title="Settings" onClose={onClose} appTheme={appTheme}>
      <div className="space-y-6">
        <p className={`${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Personalize your SmartHome experience.</p>
        
        {/* Theme Toggle */}
        <div className={`border rounded-lg p-4 flex items-center justify-between ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
          <div>
            <h3 className={`font-semibold ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>App Theme</h3>
            <p className={`text-sm ${appTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Switch between light and dark modes.</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
              appTheme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {appTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Change Password Option */}
        <div className={`border rounded-lg p-4 flex items-center justify-between ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
          <div>
            <h3 className={`font-semibold ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Security</h3>
            <p className={`text-sm ${appTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account password.</p>
          </div>
          <button
            onClick={() => setShowChangePasswordModal(true)}
            className="px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Change Password
          </button>
        </div>

        {/* Notification Preferences */}
        <div className={`border rounded-lg p-4 ${appTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
          <h3 className={`font-semibold ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Notification Preferences</h3>
          <p className={`text-sm ${appTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Control which notifications you receive.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="securityAlerts" className={`${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Security Alerts</label>
              <input type="checkbox" id="securityAlerts" defaultChecked className="toggle toggle-primary" />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="deviceStatus" className={`${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Device Status Changes</label>
              <input type="checkbox" id="deviceStatus" className="toggle toggle-primary" />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="usageReports" className={`${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Usage Reports</label>
              <input type="checkbox" id="usageReports" defaultChecked className="toggle toggle-primary" />
            </div>
          </div>
        </div>

        <p className={`${appTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>More settings options coming soon!</p>
      </div>
    </ModalWrapper>
  );
};


// Main Dashboard Component
const Dashboard = () => {
  // Define your ESP8266 Base URL here
  const ESP_BASE_URL = 'http://192.168.4.1'; 

  // Hardcoded device IDs for ESP's 'Add Device' slots
  const ESP_GENERIC_DEVICE_IDS = [101, 102]; // Corresponds to zE/zF (ledPin2) and zG/zH (ledPin3) respectively.
  // Note: zI/zJ (ledPin4) is dedicated to Outdoor Camera (ID 5) in this setup.

  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Light', type: 'light', isOn: false, online: false, usage: 75, lastUpdated: '5 mins ago' }, // Mapped to ledPin1 (zC/zD)
    { id: 2, name: 'Security Light', type: 'security-light', isOn: false, online: false, usage: 90, lastUpdated: '1 min ago' }, // LDR controlled on ESP
    { id: 3, name: 'Main Fan', type: 'fan', isOn: false, online: false, usage: 30, lastUpdated: '10 mins ago' }, // Mapped to ledPin (zA/zB)
    { id: 4, name: 'Front Door', type: 'door', isOn: false, online: false, usage: 50, lastUpdated: '2 hours ago' }, // Mapped to Servo (zO/zP)
    { id: 5, name: 'Outdoor Camera', type: 'camera', isOn: false, online: false, usage: 95, lastUpdated: '30 seconds ago' }, // Mapped to ledPin4 (zI/zJ)
    { id: 6, name: 'Ultrasonic Sensor', type: 'sensor', isOn: false, online: false, usage: 10, lastUpdated: '5 seconds ago' }, // Mapped to zM/zN
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Motion Detected', message: 'Motion detected in front yard.', time: 'Just now', read: false },
    { id: 2, title: 'Device Offline', message: 'Living Room Light went offline.', time: '1 hour ago', read: false },
    { id: 3, title: 'Welcome!', message: 'Welcome to your SmartHome dashboard!', time: '2 days ago', read: true },
  ]);

  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [messageBox, setMessageBox] = useState(null); // Central message box state for ESP feedback

  const [appTheme, setAppTheme] = useState('light'); // 'light' or 'dark'

  // Day/Night simulation state for Security Light (controlled by ESP's LDR)
  const [isDay, setIsDay] = useState(true); 

  // Simulate day/night cycle every 10 seconds for security light's display in app
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDay(prevIsDay => !prevIsDay);
    }, 10000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Update Security Light's *display* based on simulated day/night.
  // The actual light is controlled by the LDR on ESP.
  useEffect(() => {
    setDevices(prevDevices =>
      prevDevices.map(device => {
        if (device.type === 'security-light') {
          return { ...device, isOn: !isDay, online: true, lastUpdated: 'Just now' }; 
        }
        return device;
      })
    );
  }, [isDay]);

  // Function to find the next available generic ESP device ID slot
  const getNextGenericDeviceId = useCallback(() => {
    const usedGenericIds = devices
      .filter(device => ESP_GENERIC_DEVICE_IDS.includes(device.id))
      .map(device => device.id);

    const availableIds = ESP_GENERIC_DEVICE_IDS.filter(id => !usedGenericIds.includes(id));

    return availableIds.length > 0 ? availableIds[0] : null;
  }, [devices]); // Depends on 'devices' state

  // Function to send commands to ESP8266
  const sendEspCommand = useCallback(async (deviceId, targetIsOnBoolean, deviceName) => {
    let commandCode = '';
    // Map device ID to ESP's specific 'zX' commands based on YOUR ESP firmware
    switch (deviceId) {
      case 1: // Living Room Light (ledPin1)
        commandCode = targetIsOnBoolean ? 'zC' : 'zD';
        break;
      case 3: // Main Fan (ledPin)
        commandCode = targetIsOnBoolean ? 'zA' : 'zB';
        break;
      case 4: // Front Door (myServo)
        commandCode = targetIsOnBoolean ? 'zO' : 'zP'; // zO for OPEN (sweeps 0-180), zP for CLOSED (sweeps 180-0)
        break;
      case 5: // Outdoor Camera (ledPin4)
        commandCode = targetIsOnBoolean ? 'zI' : 'zJ';
        break;
      case 6: // Ultrasonic Sensor (TRIG_PIN/ECHO_PIN)
        commandCode = targetIsOnBoolean ? 'zM' : 'zN';
        break;
      case 101: // Add Device 1 (ledPin2) - First generic slot
        commandCode = targetIsOnBoolean ? 'zE' : 'zF';
        break;
      case 102: // Add Device 2 (ledPin3) - Second generic slot
        commandCode = targetIsOnBoolean ? 'zG' : 'zH';
        break;
      default:
        setMessageBox({ type: 'error', message: `No ESP command mapping for device ID: ${deviceId}` });
        return false;
    }

    const url = `${ESP_BASE_URL}/${commandCode}`; // URL will be like http://192.168.4.1/zC

    console.log(`Attempting to send command to ESP: ${url}`);

    try {
        await fetch(url, { method: 'GET', mode: 'no-cors' });
        setMessageBox({ type: 'success', message: `Command sent for "${deviceName}" (${commandCode}).` });
        return true; 
    } catch (error) {
        console.error(`Error controlling ${deviceName} via ESP:`, error);
        setMessageBox({ type: 'error', message: `Failed to send command to "${deviceName}". Check ESP connection and programming. Error: ${error.message}` });
        return false;
    }
  }, [ESP_BASE_URL]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleToggle = async (id) => {
    const deviceToToggle = devices.find(d => d.id === id);

    if (!deviceToToggle) return; 

    if (deviceToToggle.type === 'security-light') {
      setMessageBox({type: 'info', message: 'Security Light is automatically controlled by its photocell sensor.'});
      return;
    }

    const newIsOn = !deviceToToggle.isOn;
    
    const commandSuccessful = await sendEspCommand(deviceToToggle.id, newIsOn, deviceToToggle.name);

    if (commandSuccessful) {
      setDevices(prevDevices =>
        prevDevices.map(device =>
          device.id === id
            ? {
                ...device,
                isOn: newIsOn,
                online: newIsOn,
                lastUpdated: 'Just now'
              }
            : device
        )
      );
    }
  };

  const handleCameraClick = (device) => {
    if (device.isOn) {
      setSelectedCamera(device);
    } else {
      setMessageBox({type: 'warning', message: `${device.name} is currently OFF. Please turn it ON first to view feed.`});
    }
  };

  const handleAddDevice = (newDevice) => {
    // Dynamically assign the next available generic ESP ID (101, 102)
    const assignedEspId = getNextGenericDeviceId();

    if (assignedEspId === null) {
      setMessageBox({type: 'error', message: 'No more generic "Add Device" slots available on ESP to assign. Max 2 supported.'});
      return;
    }
    
    setDevices(prevDevices => [...prevDevices, { ...newDevice, id: assignedEspId, online: newDevice.isOn, lastUpdated: 'Just now' }]);
    setMessageBox({type: 'success', message: `Device "${newDevice.name}" added to dashboard and mapped to ESP slot ID ${assignedEspId}.`});
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const toggleTheme = () => {
    setAppTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const nextGenericDeviceIdForModal = getNextGenericDeviceId();

  return (
    <div className={`min-h-screen ${appTheme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Header */}
      <header className={`py-4 px-6 flex items-center justify-between shadow-md ${appTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${appTheme === 'dark' ? 'bg-blue-800' : 'bg-blue-100'}`}>
            <Home className={`w-6 h-6 ${appTheme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} />
          </div>
          <h1 className={`text-2xl font-bold ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>SmartHome Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className={`p-2 rounded-full relative ${appTheme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <Bell className="w-6 h-6" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            <NotificationDropdown
              notifications={notifications}
              isOpen={showNotificationDropdown}
              onClose={() => setShowNotificationDropdown(false)}
              onMarkAsRead={markNotificationAsRead}
              appTheme={appTheme}
            />
          </div>

          <button
            onClick={() => setShowSettingsModal(true)}
            className={`p-2 rounded-full ${appTheme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${appTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Devices</h2>
          <p className={`text-lg ${appTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Control and monitor your smart home from here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {devices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              onToggle={handleToggle}
              onCameraClick={handleCameraClick}
              appTheme={appTheme}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setShowAddDeviceModal(true)}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" /> Add New Device
          </button>
          <button
            onClick={() => setShowAnalyticsModal(true)}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition duration-200 shadow-md ${appTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'}`}
          >
            <BarChart3 className="w-5 h-5 mr-2" /> View Analytics
          </button>
        </div>

        {/* Current Day/Night Status for demo */}
        <div className={`text-center mt-8 p-4 rounded-lg ${isDay ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-900 text-blue-200'}`}>
          <p className="font-semibold text-lg">
            It's currently: {isDay ? 'Daytime' : 'Nighttime'}
          </p>
          <p className="text-sm">Security lights are {isDay ? 'off' : 'on'} automatically.</p>
        </div>

      </main>

      {/* Modals */}
      {selectedCamera && (
        <LiveCamera device={selectedCamera} onClose={() => setSelectedCamera(null)} appTheme={appTheme} />
      )}
      {showAddDeviceModal && (
        <AddNewDeviceModal 
          onClose={() => setShowAddDeviceModal(false)} 
          onAddDevice={handleAddDevice} 
          appTheme={appTheme} 
          nextGenericDeviceId={nextGenericDeviceIdForModal} // Pass available slot
        />
      )}
      {showAnalyticsModal && (
        <ViewAnalyticsModal onClose={() => setShowAnalyticsModal(false)} appTheme={appTheme} />
      )}
      {showSettingsModal && (
        <SettingsModal 
          onClose={() => setShowSettingsModal(false)} 
          appTheme={appTheme} 
          toggleTheme={toggleTheme} 
          setShowChangePasswordModal={setShowChangePasswordModal} 
        />
      )}
      {showChangePasswordModal && (
        <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} appTheme={appTheme} />
      )}
      {/* Centralized Message Box for ESP feedback */}
      {messageBox && (
        <MessageBox
          type={messageBox.type}
          message={messageBox.message}
          onClose={() => setMessageBox(null)}
        />
      )}
    </div>
  );
};

// Main App Component
// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing user session on component mount
  useEffect(() => {
    const savedUser = userStorage.getUser();
    if (savedUser && savedUser.user) {
      setUser(savedUser.user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (credentials) => {
    console.log("Logging in with:", credentials);
    
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });

      // Store user data
      userStorage.setUser(response);
      setUser(response.user);
      setIsLoggedIn(true);
      
      return { success: true, message: 'Login successful!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleRegister = async (userData) => {
    console.log("Registering user:", userData);
    
    try {
      const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });

      return { success: true, message: 'Registration successful! Please login.' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleLogout = () => {
    userStorage.removeUser();
    setUser(null);
    setIsLoggedIn(false);
    setIsRegistering(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : isRegistering ? (
        <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setIsRegistering(false)} />
      ) : (
        <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setIsRegistering(true)} />
      )}
    </>
  );
};


export default App;
