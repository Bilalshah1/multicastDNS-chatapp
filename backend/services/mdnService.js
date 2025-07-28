const Bonjour = require('bonjour');

const bonjour = new Bonjour();

let browser = null;
let discoveredDevices = [];
let advertisement = null;

/**
 * Start discovering services on the local network.
 * @param {string} type - The type of service to discover (e.g., 'http').
 */
function startDiscovery(type = 'http') {
  if (browser) return; // Already running
  discoveredDevices = [];
  browser = bonjour.find({ type }, (service) => {
    discoveredDevices.push(service);
  });
}

/**
 * Stop discovering services.
 */
function stopDiscovery() {
  if (browser) {
    browser.stop();
    browser = null;
  }
}

/**
 * Get the list of discovered devices/services.
 */
function getDiscoveredDevices() {
  return discoveredDevices;
}

/**
 * Advertise this backend as a service on the network.
 * @param {Object} options - Service options (name, type, port, etc.)
 */
function advertiseService(options = { name: 'LocalNet Backend', type: 'http', port: 5000 }) {
  if (advertisement) return; // Already advertising
  advertisement = bonjour.publish(options);
}

/**
 * Stop advertising the service.
 */
function stopAdvertisement() {
  if (advertisement) {
    advertisement.stop();
    advertisement = null;
  }
}

module.exports = {
  startDiscovery,
  stopDiscovery,
  getDiscoveredDevices,
  advertiseService,
  stopAdvertisement,
};
