function translate(language) {
  console.log(language);
  fetch(`languages/${language}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch translations (${response.status}): ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((translations) => {
      document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.dataset.translate;
        element.textContent = translations[key] || key;
      });

      
      document.cookie = `selectedLanguage=${language}; path=/`;
    })
    .catch((error) => console.error(error));
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function() {
    document.getElementById('hiddenBanner').style.display = 'block';
  }, 5000);

  function closeBanner() {
    document.getElementById('hiddenBanner').style.display = 'none';
  }
  document.getElementById("closeButton").addEventListener("click",()=>{closeBanner()})
  const languageSelector = document.getElementById("languageSelector");
  const form = document.querySelector("#form");
  const submitButton = form.querySelector("button[type='submit']");
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbz4bRvifpz1OYxBv4fCZPSV3i9fsm-yXtSYpVjH9Eod4kLtpseEYTfpccmkPG00gE5f/exec";

  const selectedLanguage = getCookie("selectedLanguage");
  if (selectedLanguage) {
    translate(selectedLanguage);
    languageSelector.value = selectedLanguage;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitButton.disabled = true;

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        if (response.ok) {
          alert("Success!");
          form.reset();
        } else {
          alert("Error! Please try again.");
        }
        submitButton.disabled = false;
      })
      .catch((error) => {
        alert("Error! Please try again.");
        submitButton.disabled = false;
      });
  });


  languageSelector.addEventListener("change", function () {
    translate(this.value);
  });

  window.translate = translate; 

  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
});
