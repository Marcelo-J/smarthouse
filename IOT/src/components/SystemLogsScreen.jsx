import React, { useState } from 'react';

function SystemLogsScreen() {
  const [logs, setLogs] = useState([
    { id: 1, timestamp: '2024-01-20 14:30:25', device: 'iPhone 14 Pro', status: 'Success', action: 'Login Attem]' },
    { id: 2, timestamp: '2024-01-20 14:29:15', device: 'Samsung S21', status: 'Error', action: 'Data Sync' },
    { id: 3, timestamp: '2024-01-20 14:28:45', device: 'MacBook Pro', status: 'Warning', action: 'Passw Chang' },
    { id: 4, timestamp: '2024-01-20 14:27:30', device: 'iPad Air', status: 'Success', action: 'App Updat' },
    { id: 5, timestamp: '2024-01-20 14:26:15', device: 'Android Tab', status: 'Success', action: 'File Uploa' },
    { id: 6, timestamp: '2024-01-20 14:25:00', device: 'Windows PC', status: 'Error', action: 'Login Attem' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log =>
    log.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">System Logs</h1>
        <span className="text-sm text-gray-500">9:41</span>
      </header>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Search logs..."
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z" />
          </svg>
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 8.586L6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 00-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Timestamp</th>
              <th className="p-3 text-left">Device</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id} className="border-t">
                <td className="p-3">{log.timestamp}</td>
                <td className="p-3">{log.device}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${log.status === 'Success' ? 'bg-green-100 text-green-800' : log.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="p-3">{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SystemLogsScreen;