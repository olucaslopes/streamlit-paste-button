# Streamlit - Paste Button

[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://paste-button.streamlit.app/)
<a href="https://www.buymeacoffee.com/olucaslopes" target="_blank"><img align="right" src="https://raw.githubusercontent.com/olucaslopes/streamlit-paste-button/main/docs/img/coffee.jpg" alt="Buy Me A Coffee" height="50" width="180"></a><br>

[![PyPI](https://img.shields.io/pypi/v/streamlit-paste-button)](https://pypi.org/project/streamlit-paste-button/)
[![PyPI - Downloads](https://img.shields.io/pypi/dm/streamlit-paste-button)](https://pypi.org/project/streamlit-paste-button/)
![GitHub](https://img.shields.io/github/license/olucaslopes/streamlit-paste-button)

![Browser Support](https://img.shields.io/badge/Browser%20Support-Chrome%20%7C%20Safari%20%7C%20Edge-green)
![Unsupported Browsers](https://img.shields.io/badge/Unsupported%20Browsers-Firefox%20%7C%20Mobile%20Browsers-red)


Streamlit component that allows you to paste images from your clipboard into your app with a button click.

<div align="center">
  <img src="https://raw.githubusercontent.com/olucaslopes/streamlit-paste-button/main/docs/img/demo.gif"><br>
</div>

## Installation instructions 

```sh
pip install streamlit-paste-button
```

## Browser support
- The browser must support the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
- Secure contexts (HTTPS) are required for clipboard access in most browsers. 


## API Reference

### `paste_image_button`

Create a button that can be used to paste an image from the clipboard.

```
streamlit_paste_button.paste_image_button(
        label: str,
        text_color: Optional[str] = "#ffffff",
        background_color: Optional[str] = "#3498db",
        hover_background_color: Optional[str] = "#2980b9",
        key: Optional[str] = 'paste_button',
        errors: Optional[str] = 'ignore'
) -> PasteResult
```

- `label` : str, required
    - The text to display on the button.
- `text_color` : str, optional
    - The color of the text on the button.
    - Default: `#ffffff`
- `background_color` : str, optional
    - The background color of the button.
    - Default: `#3498db`
- `hover_background_color` : str, optional
    - The background color of the button when the mouse is hovering over it.
    - Default: `#2980b9`
- `key` : str, optional
    - An optional string to use as the unique key for the widget.
    - Default: `paste_button`
- `errors` : str, optional
    - Determines how errors are handled.
    - Default: `ignore`
    - Possible values:
        - `ignore` : Ignores errors.
        - `raise` : Display errors as `st.error` messages.

### `PasteResult`

The result of a paste operation.

#### Attributes
- `image_data` : PIL.Image.Image or None
    - The image data that was pasted.
    - If no image was pasted, this will be `None`.



## Usage Examples

### Basic Example

Create a paste button that displays the pasted image when clicked.

```python
import streamlit as st
from streamlit_paste_button import paste_image_button as pbutton

paste_result = pbutton("📋 Paste an image")

if paste_result.image_data is not None:
    st.write('Pasted image:')
    st.image(paste_result.image_data)
```

### Customizing the button

Create a paste button with a custom label and colors.

```python
from streamlit_paste_button import paste_image_button as pbutton

paste_result = pbutton(
    label="📋 Paste an image",
    text_color="#ffffff",
    background_color="#FF0000",
    hover_background_color="#380909",
)
```

### Handling errors

Create a paste button that displays errors as `st.error` messages.

```python
from streamlit_paste_button import paste_image_button as pbutton

paste_result = pbutton(
    label="📋 Paste an image",
    errors="raise",
)
```

### Converting the PasteResult

PasteResult is a PIL.Image.Image object. It can be manipulated as such.

```python
from streamlit_paste_button import paste_image_button as pbutton
import io
import base64
import numpy as np

paste_result = pbutton("📋 Paste an image")

if paste_result.image_data is not None:
    # Convert to bytes
    img_bytes = io.BytesIO()
    paste_result.image_data.save(img_bytes, format='PNG')
    img_bytes = img_bytes.getvalue() # Image as bytes

    # Convert to base64
    img_b64 =  base64.b64encode(img_bytes).decode('utf-8') # Image as base64

    # Convert to numpy array
    img_np = np.array(paste_result.image_data) # Image as numpy array
```