const React = require('react');

function LoginScreen() {
  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gray-100 flex items-center justify-center' },
    React.createElement(
      'div',
      { className: 'bg-white p-6 rounded-lg shadow-lg w-full max-w-md' },
      React.createElement('h2', { className: 'text-2xl font-bold mb-4 text-center' }, 'Login'),
      React.createElement(
        'div',
        { className: 'space-y-4' },
        React.createElement('input', {
          type: 'text',
          className: 'w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
          placeholder: 'Username'
        }),
        React.createElement('input', {
          type: 'password',
          className: 'w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
          placeholder: 'Password'
        }),
        React.createElement(
          'button',
          { className: 'w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700' },
          'Login'
        )
      )
    )
  );
}

module.exports = LoginScreen;