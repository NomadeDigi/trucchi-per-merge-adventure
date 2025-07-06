// notifier.js
// Simple browser notification manager with fallback to console log
// Author: NomadeDigi - Educational purposes only

class Notifier {
  static isSupported() {
    return 'Notification' in window;
  }

  static async requestPermission() {
    if (!Notifier.isSupported()) {
      console.warn('Notifications not supported in this browser.');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  static async notify(title, options = {}) {
    const permitted = await Notifier.requestPermission();

    if (permitted) {
      new Notification(title, options);
    } else {
      // Fallback: log to console
      console.log(`[Notification] ${title}`, options);
    }
  }
}

// Example usage:
// Notifier.notify('NomadeDigi Alert', { body: 'This is a test notification!' });

export default Notifier;
