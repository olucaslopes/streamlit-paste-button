# Streamlit - Paste Button

Streamlit component that allows you to paste images from your clipboard into your app with a button click.

## Installation instructions 

```sh
pip install streamlit-paste-button
```

## Usage instructions

```python
import streamlit as st

from streamlit_paste_button import paste_image_button as pbutton

value = pbutton()

st.write(value)
