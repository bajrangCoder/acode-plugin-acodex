const ip = require('ip');

module.exports = async (mode = 'dev') => {
  const ip_addr = ip.address();
  const port = 5500;
  const src = `https://${ip_addr || '10.0.0'}:${port}`;
  console.log('Server starting at: ', src);
  return { ip_addr, port };
};
