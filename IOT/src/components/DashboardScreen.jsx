import React, { useState, useEffect } from 'react';

function DashboardScreen() {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Hub', status: 'Online', cpuUsage: '45%', memoryUsage: '60%', lastUpdate: '2 mins ago' },
    { id: 2, name: 'Kitchen Sensor', status: 'Online', cpuUsage: '30%', memoryUsage: '45%', lastUpdate: '1 min ago' },
    { id: 3, name: 'Bedroom Camera', status: 'Offline', cpuUsage: '0%', memoryUsage: '0%', lastUpdate: '5 mins ago' },
    { id: 4, name: 'Garage Door', status: 'Online', cpuUsage: '25%', memoryUsage: '35%', lastUpdate: '3 mins ago' },
    { id: 5, name: 'Security System', status: 'Online', cpuUsage: '55%', memoryUsage: '70%', lastUpdate: 'Just now' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(devices.map(device => ({
        ...device,
        cpuUsage: `${Math.floor(Math.random() * 100)}%`,
        memoryUsage: `${Math.floor(Math.random() * 100)}%`,
        lastUpdate: `${Math.floor(Math.random() * 5)} mins ago`,
      })));
    }, 10000);
    return () => clearInterval(interval);
  }, [devices]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Smart Home Dashboard</h1>
        <span className="text-sm text-gray-500">9:41</span>
      </header>
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <span className="block text-sm text-gray-600">Total Devices</span>
            <span className="text-lg font-semibold">12</span>
          </div>
          <div className="bg-green-100 p-3 rounded-lg text-center">
            <span className="block text-sm text-gray-600">Active Devices</span>
            <span className="text-lg font-semibold">8</span>
          </div>
        </div>
        <div className="space-y-4">
          {devices.map(device => (
            <div key={device.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  {device.name === 'Living Room Hub' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.09-.647.35-1.088.636-1.338-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.544 1.377.202 2.394.099 2.647.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.482C17.137 18.166 20 14.418 20 10c0-5.52-4.48-10-10-10z" />
                  </svg>}
                  {device.name === 'Kitchen Sensor' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>}
                  {device.name === 'Bedroom Camera' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>}
                  {device.name === 'Garage Door' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>}
                  {device.name === 'Security System' && <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>}
                  <span className="font-semibold">{device.name}</span>
                </div>
                <div className="space-y-1">
                  <p>CPU Usage: <span className="text-blue-600">{device.cpuUsage}</span></p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: device.cpuUsage }}></div>
                  </div>
                  <p>Memory Usage: <span className="text-blue-600">{device.memoryUsage}</span></p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: device.memoryUsage }}></div>
                  </div>
                  <p className="text-sm text-gray-500">Updated: {device.lastUpdate} <span className="text-blue-500">Every 10s</span></p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${device.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {device.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <nav className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow flex justify-around">
        <a href="/" className="text-gray-600 hover:text-blue-600">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>
        <a href="/devices" className="text-gray-600 hover:text-blue-600">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm0 2h10v6H5V6z" />
          </svg>
        </a>
        <a href="/logs" className="text-gray-600 hover:text-blue-600">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 4a1 1 0 100 2h6a1 1 0 100-2H7z" />
          </svg>
        </a>
        <a href="/alerts" className="text-gray-600 hover:text-blue-600">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
        </a>
        <a href="/settings" className="text-gray-600 hover:text-blue-600">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
        </a>
      </nav>
    </div>
  );
}

export default DashboardScreen;