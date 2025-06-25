import React from 'react';

function EmailAlertsScreen() {
  const alerts = [
    { id: 1, time: '10:30 AM', device: 'Server 01', event: 'Offline Alert', status: 'Sent' },
    { id: 2, time: '09:15 AM', device: 'Database', event: 'CPU Usage', status: 'Sent' },
    { id: 3, time: '08:45 AM', device: 'Server 02', event: 'Memory Alert', status: 'Failed' },
    { id: 4, time: '07:30 AM', device: 'Gateway', event: 'Offline Alert', status: 'Sent' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Email Alerts</h1>
        <span className="text-sm text-gray-500">9:41</span>
      </header>
      <div className="mb-6">
        <p className="text-sm text-gray-600">Alert History & Configuration</p>
        <div className="mt-2 bg-blue-50 p-4 rounded-lg text-blue-700 text-sm flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.09-.647.35-1.088.636-1.338-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.544 1.377.202 2.394.099 2.647.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.482C17.137 18.166 20 14.418 20 10c0-5.52-4.48-10-10-10z" />
          </svg>
          Email frequency configuration coming soon
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Alert History</h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Device</th>
                <th className="p-3 text-left">Event</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.id} className="border-t">
                  <td className="p-3">{alert.time}</td>
                  <td className="p-3">{alert.device}</td>
                  <td className="p-3">{alert.event}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${alert.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmailAlertsScreen;