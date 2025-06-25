import React, { useState } from 'react';

function DeviceControlScreen() {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room', type: 'light', status: true, lastCommand: '0x71...32e' },
    { id: 2, name: 'AC Temperature', type: 'ac', status: false, lastCommand: '0x71...32e' },
    { id: 3, name: 'Smart Plug', type: 'plug', status: true, lastCommand: '0x71...32e' },
    { id: 4, name: 'Ceiling Fan', type: 'fan', status: false, lastCommand: '0x71...32e' },
    { id: 5, name: 'Security', type: 'camera', status: true, lastCommand: '0x71...32e' },
  ]);

  const toggleDevice = (id) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, status: !device.status } : device
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Device Control</h1>
        <span className="text-sm text-gray-500">9:41</span>
      </header>
      <p className="text-sm text-gray-600 mb-4">5 Devices Connected</p>
      <div className="bg-green-100 text-green-800 text-sm p-2 rounded mb-4 text-center">
        Device status updated successfully
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {devices.map(device => (
          <div key={device.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                {device.type === 'light' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 8a1 1 0 100 2 1 1 0 000-2zm0 8a1 1 0 100 2 1 1 0 000-2z" />
                </svg>}
                {device.type === 'ac' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 8a1 1 0 100 2 1 1 0 000-2zm0 8a1 1 0 100 2 1 1 0 000-2z" />
                </svg>}
                {device.type === 'plug' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 8a1 1 0 100 2 1 1 0 000-2zm0 8a1 1 0 100 2 1 1 0 000-2z" />
                </svg>}
                {device.type === 'fan' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 8a1 1 0 100 2 1 1 0 000-2zm0 8a1 1 0 100 2 1 1 0 000-2z" />
                </svg>}
                {device.type === 'camera' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 8a1 1 0 100 2 1 1 0 000-2zm0 8a1 1 0 100 2 1 1 0 000-2z" />
                </svg>}
                <span className="font-semibold">{device.name}...</span>
              </div>
              <p className="text-sm text-gray-500">Last Command: {device.lastCommand}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={device.status}
                onChange={() => toggleDevice(device.id)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
        <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center justify-center text-gray-500">
          <span>+</span>
          <p className="ml-2">Add Device</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center justify-center text-gray-500">
          <span>+</span>
          <p className="ml-2">Add Device</p>
        </div>
      </div>
    </div>
  );
}

export default DeviceControlScreen;