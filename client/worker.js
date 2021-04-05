console.log('service workr loadd');

self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: 'Notifid by lovish hamal',
  });
});
