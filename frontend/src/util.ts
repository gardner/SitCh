import React from "react";
import config from './config';

const SERVICE_WORKER_FILE = '/sw.js';


export const pushEnabled =
  "serviceWorker" in navigator && "PushManager" in window;

export const PERMISSION_STATES = {
  UNKNOWN: 0,
  GRANTED: 1,
  DENIED: 2,
};

// Ask for permission for push notifications
export async function askForPushPermission() {
  // https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then((permissionResult) => {
    if (permissionResult !== "granted") {
      return PERMISSION_STATES.DENIED;
    }
    return PERMISSION_STATES.GRANTED;
  });
}

const [, setPermissionState] = React.useState(PERMISSION_STATES.UNKNOWN);
export const handleSubscribeToPushNotifications = async () => {
  // Step 1: Ask the user for permission.
  const permissionResult = await askForPushPermission();

  setPermissionState(permissionResult);
};


export async function getServiceWorkerSubscription() {
  return navigator.serviceWorker
    .register(SERVICE_WORKER_FILE)
    .then(registration => {
      console.log(
        'Service worker registered! Waiting for it to become active...'
      );
      const serviceWorker =
        registration.installing || registration.waiting || registration.active;
      let whenRegistrationActive = Promise.resolve(registration);
      if (!registration.active || registration.active.state !== 'activated') {
        whenRegistrationActive = new Promise(resolve => {
          serviceWorker?.addEventListener('statechange', e => {
            // @ts-ignore
            if (e?.target?.state === 'activated') {
              resolve(registration);
            }
          });
        });
      }
      return whenRegistrationActive;
    });
}

/**
 * urlBase64ToUint8Array
 *
 * @param {string} publicVapidKey a public vapid key
 */
 export function urlB64ToUint8Array(publicVapidKey: string) {
  const padding = '='.repeat((4 - (publicVapidKey.length % 4)) % 4);
  const base64 = (publicVapidKey + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeUserToPush() {
  return getServiceWorkerSubscription().then(registration => {
    console.log('Service worker active! Ready to go.');

    const { vapidPublicKey } = config;

    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(vapidPublicKey),
    };

    return registration.pushManager.subscribe(subscribeOptions);
  });
}