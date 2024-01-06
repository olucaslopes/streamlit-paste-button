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
        // Change body background color to the theme background color
        document.body.style.backgroundColor = event.detail.theme.backgroundColor;

        // Grab the label and default value that the user specified
        const {label, text_color, background_color, hover_background_color, key} = event.detail.args;
        const pasteButton = document.getElementById('paste_button');

        // Set the label text and style to be what the user specified
        pasteButton.innerHTML = label;
        paste_button.style.color = text_color;
        pasteButton.id = key;

        pasteButton.addEventListener('click', parseClipboardData);
//
        // Set the button color on hover
        pasteButton.style.backgroundColor = background_color; // Set initial background color

        pasteButton.addEventListener('mouseover', function() {
          pasteButton.style.backgroundColor = hover_background_color; // Change color on hover
        });

        pasteButton.addEventListener('mouseout', function() {
          pasteButton.style.backgroundColor = background_color; // Restore initial color when not on hover
        });


        // Set the button's text font
        pasteButton.style.fontFamily = event.detail.theme.font;


//        pasteButton.onclick = event => {
//          parseClipboardData();
//        };

    // Prevent multiple render events
    window.rendered = true;
  }
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);
Streamlit.setComponentReady();
Streamlit.setFrameHeight(40);
