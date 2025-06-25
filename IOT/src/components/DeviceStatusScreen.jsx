const React = require('react');

function DeviceStatusScreen() {
  const devices = [
    { id: 1, name: 'Server-01', status: 'Active', cpu: '65%', memory: '45%', storage: '30%', lastUpdate: '2 mins ago' },
    { id: 2, name: 'Network Switch', status: 'Warning', cpu: '85%', memory: '75%', storage: '40%', lastUpdate: '1 min ago' },
    { id: 3, name: 'Database-01', status: 'Critical', cpu: '95%', memory: '85%', storage: '70%', lastUpdate: '1 min ago' },
    { id: 4, name: 'Desktop-01', status: 'Active', cpu: '45%', memory: '30%', storage: '20%', lastUpdate: '3 mins ago' },
    { id: 5, name: 'Mobile-01', status: 'Active', cpu: '55%', memory: '40%', storage: '25%', lastUpdate: '1 min ago' },
    { id: 6, name: 'Tablet-01', status: 'Warning', cpu: '75%', memory: '60%', storage: '45%', lastUpdate: '4 mins ago' },
  ];

  const stats = {
    totalDevices: 124,
    activeDevices: 98,
    warnings: 18,
    critical: 8,
  };

  const recentActivities = [
    '14:30 Server-01 CPU usage exceeded 80%',
    '14:25 Database-01 connection restored',
    '14:20 Network Switch performance degradation',
    '14:15 Mobile-01 battery status updated',
  ];

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gray-50 p-6' },
    React.createElement(
      'header',
      { className: 'flex justify-between items-center mb-6' },
      React.createElement(
        'div',
        { className: 'flex items-center' },
        React.createElement('span', { className: 'text-blue-600 text-2xl font-bold' }, 'DeviceMonitor'),
        React.createElement(
          'nav',
          { className: 'ml-6 space-x-4' },
          React.createElement('a', { href: '#', className: 'text-gray-600 hover:text-blue-600' }, 'Dashboard'),
          React.createElement('a', { href: '#', className: 'text-gray-600 hover:text-blue-600' }, 'Devices'),
          React.createElement('a', { href: '#', className: 'text-gray-600 hover:text-blue-600' }, 'Analytics'),
          React.createElement('a', { href: '#', className: 'text-gray-600 hover:text-blue-600' }, 'Settings')
        )
      ),
      React.createElement(
        'div',
        { className: 'relative' },
        React.createElement('input', {
          type: 'text',
          className: 'p-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
          placeholder: 'Search devices...'
        }),
        React.createElement('svg', {
          className: 'w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2',
          fill: 'currentColor',
          viewBox: '0 0 20 20'
        }, React.createElement('path', { d: 'M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z' }))
      )
    ),
    React.createElement(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-4 gap-4 mb-6' },
      React.createElement(
        'div',
        { className: 'bg-white p-4 rounded-lg shadow flex items-center' },
        React.createElement('span', { className: 'text-gray-600 mr-2' }, 'Total Devices'),
        React.createElement('span', { className: 'text-2xl font-bold' }, stats.totalDevices)
      ),
      React.createElement(
        'div',
        { className: 'bg-white p-4 rounded-lg shadow flex items-center' },
        React.createElement('span', { className: 'text-green-600 mr-2' }, '✔'),
        React.createElement('span', { className: 'text-gray-600 mr-2' }, 'Active Devices'),
        React.createElement('span', { className: 'text-2xl font-bold' }, stats.activeDevices)
      ),
      React.createElement(
        'div',
        { className: 'bg-white p-4 rounded-lg shadow flex items-center' },
        React.createElement('span', { className: 'text-yellow-600 mr-2' }, '⚠'),
        React.createElement('span', { className: 'text-gray-600 mr-2' }, 'Warnings'),
        React.createElement('span', { className: 'text-2xl font-bold' }, stats.warnings)
      ),
      React.createElement(
        'div',
        { className: 'bg-white p-4 rounded-lg shadow flex items-center' },
        React.createElement('span', { className: 'text-red-600 mr-2' }, '✖'),
        React.createElement('span', { className: 'text-gray-600 mr-2' }, 'Critical'),
        React.createElement('span', { className: 'text-2xl font-bold' }, stats.critical)
      )
    ),
    React.createElement(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-6' },
      ...devices.map(device =>
        React.createElement(
          'div',
          { key: device.id, className: 'bg-white p-4 rounded-lg shadow flex items-center justify-between' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'flex items-center space-x-2 mb-1' },
              device.name === 'Server-01' && React.createElement('svg', { className: 'w-5 h-5 text-gray-600', fill: 'currentColor', viewBox: '0 0 20 20' }, React.createElement('path', { d: 'M4 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' })),
              device.name === 'Network Switch' && React.createElement('svg', { className: 'w-5 h-5 text-gray-600', fill: 'currentColor', viewBox: '0 0 20 20' }, React.createElement('path', { d: 'M4 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' })),
              device.name === 'Database-01' && React.createElement('svg', { className: 'w-5 h-5 text-gray-600', fill: 'currentColor', viewBox: '0 0 20 20' }, React.createElement('path', { d: 'M4 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' })),
              device.name === 'Desktop-01' && React.createElement('svg', { className: 'w-5 h-5 text-gray-600', fill: 'currentColor', viewBox: '0 0 20 20' }, React.createElement('path', { d: 'M4 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' })),
              device.name === 'Mobile-01' && React.createElement('svg', { className: 'w-5 h-5 text-gray-600', fill: 'currentColor', viewBox: '0 0 20 20' }, React.createElement('path', { d: 'M4 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' })),
              device.name === 'Tablet-01' && React.createElement('svg', { className: 'w-5 h-5 text-gray-600', fill: 'currentColor', viewBox: '0 0 20 20' }, React.createElement('path', { d: 'M4 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' })),
              React.createElement('span', { className: 'font-semibold' }, device.name)
            ),
            React.createElement('p', { className: 'text-sm text-gray-500' }, 'Updated ', device.lastUpdate)
          ),
          React.createElement(
            'div',
            { className: 'text-right' },
            React.createElement('p', null, 'CPU: ', device.cpu),
            React.createElement('p', null, 'Memory: ', device.memory),
            React.createElement('p', null, 'Storage: ', device.storage),
            React.createElement(
              'span',
              { className: `px-2 py-1 rounded-full text-sm ${device.status === 'Active' ? 'bg-green-100 text-green-800' : device.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}` },
              device.status
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6' },
      React.createElement(
        'div',
        { className: 'bg-white p-4 rounded-lg shadow' },
        React.createElement('h3', { className: 'text-lg font-semibold text-gray-800 mb-2' }, 'System Performance'),
        React.createElement('chartjs', null, JSON.stringify({
          "type": "line",
          "data": {
            "labels": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
            "datasets": [{
              "label": "Performance",
              "data": [75, 70, 65, 60, 65, 70, 75],
              "borderColor": "#3b82f6",
              "backgroundColor": "rgba(59, 130, 246, 0.2)",
              "fill": true,
              "tension": 0.4
            }]
          },
          "options": {
            "scales": {
              "y": {
                "beginAtZero": true,
                "max": 100,
                "title": { "display": true, "text": "%" }
              },
              "x": {
                "title": { "display": true, "text": "Time" }
              }
            },
            "plugins": {
              "legend": { "display": false }
            }
          }
        }))
      ),
      React.createElement(
        'div',
        { className: 'bg-white p-4 rounded-lg shadow' },
        React.createElement('h3', { className: 'text-lg font-semibold text-gray-800 mb-2' }, 'Resource Utilization'),
        React.createElement('chartjs', null, JSON.stringify({
          "type": "doughnut",
          "data": {
            "labels": ["CPU", "Memory", "Storage"],
            "datasets": [{
              "data": [40, 30, 30],
              "backgroundColor": ["#3b82f6", "#10b981", "#ef4444"],
              "borderWidth": 0
            }]
          },
          "options": {
            "plugins": {
              "legend": { "position": "bottom" }
            }
          }
        }))
      )
    ),
    React.createElement(
      'div',
      { className: 'bg-white p-4 rounded-lg shadow mb-6' },
      React.createElement('h3', { className: 'text-lg font-semibold text-gray-800 mb-2' }, 'Recent Activities'),
      React.createElement(
        'ul',
        { className: 'space-y-2' },
        ...recentActivities.map((activity, index) =>
          React.createElement(
            'li',
            { key: index, className: 'text-gray-600' },
            React.createElement('span', { className: 'font-medium' }, activity)
          )
        )
      )
    ),
    React.createElement(
      'footer',
      { className: 'text-sm text-gray-500 text-center' },
      React.createElement('p', null, '© 2024 DeviceMonitor. All rights reserved.'),
      React.createElement(
        'div',
        { className: 'mt-2 space-x-4' },
        React.createElement('a', { href: '#', className: 'hover:underline' }, 'Documentation'),
        React.createElement('a', { href: '#', className: 'hover:underline' }, 'Support'),
        React.createElement('a', { href: '#', className: 'hover:underline' }, 'Privacy Policy'),
        React.createElement('span', null, 'Version 1.0.0')
      )
    )
  );
}

module.exports = DeviceStatusScreen;