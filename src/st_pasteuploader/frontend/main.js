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
  if (!window.rendered) {
    const pasteButton = document.getElementById('paste_button');
    pasteButton.onclick = event => {
      parseClipboardData();
    };
    window.rendered = true;
  }
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);
Streamlit.setComponentReady();
Streamlit.setFrameHeight(85);
