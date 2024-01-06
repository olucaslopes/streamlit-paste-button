import streamlit as st
from streamlit_paste_button import paste_image_button


def main():
    st.title('Paste an image with a button click')
    paste_result = paste_image_button(
        label="📋 Paste an image",
        background_color="#FF0000",
        hover_background_color="#380909",
        errors='raise')

    if paste_result.image_data is not None:
        st.write('Pasted image:')
        st.image(paste_result.image_data)


if __name__ == "__main__":
    main()
