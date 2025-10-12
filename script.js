document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const modalEl = document.getElementById("successModal");
  const modal = new bootstrap.Modal(modalEl);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.show();
    setTimeout(() => form.reset(), 500);
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((reg) => console.log("Service Worker registered", reg))
      .catch((err) => console.log("Service Worker registration failed", err));
  });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installContainer = document.getElementById("install-pwa");

  const installBtn = document.createElement("button");
  installBtn.innerText = "Install PWA";
  installBtn.className = "btn gradient-btn px-4 rounded-5";

  installContainer.appendChild(installBtn);

  installBtn.addEventListener("click", () => {
    installBtn.disabled = true;
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
      installBtn.remove();
    });
  });
});

window.addEventListener("appinstalled", () => {
  console.log("PWA installed");
});
