self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("Installingâ€¦");
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated!");
});


