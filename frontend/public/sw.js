self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("Installing…");
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated!");
});


