# streamlit-pasteuploader

Streamlit component that allows you to capture pasted data in an input box

## Installation instructions 

```sh
pip install streamlit-pasteuploader
```

## Usage instructions

```python
import streamlit as st

from st_pasteuploader import st_pasteuploader

value = st_pasteuploader()

st.write(value)
