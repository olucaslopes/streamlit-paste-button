# Streamlit - Paste Button

Streamlit component that allows you to paste images from your clipboard into your app with a button click.

<div align="center">
  <img src="https://raw.githubusercontent.com/olucaslopes/streamlit-paste-button/main/docs/img/demo.gif"><br>
</div>

## Installation instructions 

```sh
pip install streamlit-paste-button
```

## Usage instructions

```python
import streamlit as st
from streamlit_paste_button import paste_image_button as pbutton

paste_result = pbutton("📋 Paste an image")

if paste_result.image_data is not None:
    st.write('Pasted image:')
    st.image(paste_result.image_data)
```
