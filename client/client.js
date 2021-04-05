import { send } from '@sendgrid/mail';

const public =
  'BEUWqmUhP0jptzIS2dHd6l9pw5PwLREHE2Z3hjzieqKXJ76jfyLAnB-WRoSdEUvzuFlb7zS26tNaWGti8oaKnLE';
const private = 'Jv7-lXvNTRugl6lZ8R6R_zHNQWRFLhtqdxaxUffNEoQ';

if ('serviceWorker' in navigator) {
  send().catch((err) => console.log('err'));
}

async function send() {
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });
  console.log('service workr registered');

  //register push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(public),
  });

  console.log('push registered -> ...');
  await fetch('/room/booking', {
    method: 'POST',
    body: { subs: JSON.stringify(subscription) },
    headers: {
      'content-type': 'application/json',
    },
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
