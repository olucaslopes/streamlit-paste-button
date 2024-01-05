function sendValue(value) {
  Streamlit.setComponentValue(value);
}

async function parseClipboardData() {
  try {
    const items = await navigator.clipboard.read();
    const clipboardData = items[0];
    
    if (clipboardData.types.includes('image/png')) {
      // If the clipboard data contains an image in PNG format
      const blob = await clipboardData.getType('image/png');
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        sendValue(base64data);
      };
    } else {
      console.error('No image found in clipboard.');
    }
  } catch (error) {
    console.error('Error reading clipboard:', error);
  }
}

function onRender(event) {
    // Change body background color
    document.body.style.backgroundColor = event.detail.theme.backgroundColor;
//    console.log(event.detail.theme);

    // Grab the label and default value that the user specified
    const {label, value} = event.detail.args;

//    // Set the label text to be what the user specified
//    const label_el = document.getElementById("paste_button")
//    label_el

//      // Set the button's text and attributes
//      button.innerHTML = 'Paste Button';
//      button.id = 'paste-button';
//
//      // Append the button to the body
//      document.body.appendChild(button);
    if (!window.rendered) {
        const pasteButton = document.getElementById('paste_button');

        // Set the label text to be what the user specified
        pasteButton.innerHTML = label;

        // Set the button's text font
        pasteButton.style.fontFamily = event.detail.theme.font;

        pasteButton.onclick = event => {
          parseClipboardData();
        };
//    console.log(event.detail.theme);
    // Prevent multiple render events
    window.rendered = true;
  }
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);
Streamlit.setComponentReady();
Streamlit.setFrameHeight(85);
