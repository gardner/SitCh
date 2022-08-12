import React from "react";
import { PERMISSION_STATES, askForPushPermission, subscribeUserToPush } from './util';

export const PushSubscription = () => {
  const handleSubscribeToPushNotifications = async () => {
    // Step 1: Ask the user for permission.
    const permissionResult = await askForPushPermission();

    if (permissionResult === PERMISSION_STATES.GRANTED) {
      const pushSubscription = JSON.parse(
        JSON.stringify(await subscribeUserToPush())
      );
      console.log(pushSubscription);
    }
  };
};
