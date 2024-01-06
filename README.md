# streamlit-pasteuploader

Streamlit component that allows you to capture pasted data in an input box

## Installation instructions 

```sh
pip install streamlit-pasteuploader
```

## Usage instructions

```python
import streamlit as st

from streamlit_paste_button import paste_image_button as pbutton

value = pbutton()

st.write(value)
