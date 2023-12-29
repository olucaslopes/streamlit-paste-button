from pathlib import Path
from typing import Optional

import streamlit as st
import streamlit.components.v1 as components

# Tell streamlit that there is a component called st_pasteuploader,
# and that the code to display that component is in the "frontend" folder
frontend_dir = (Path(__file__).parent / "frontend").absolute()
_component_func = components.declare_component(
    "st_pasteuploader", path=str(frontend_dir)
)


# Create the python function that will be called
def st_pasteuploader(
        label: str,
        value: Optional[str] = "",
        key: Optional[str] = None,
):
    """
    Add a descriptive docstring
    """
    base64_image = _component_func(
        label=label,
        value=value,
        key=key,
        default=value
    )

    return base64_image


def main():
    import base64
    st.write("## Example")
    base64_image = st_pasteuploader("This is a label!")

    # print(value)
    print('type:', type(base64_image))
    # Extracting the image bytes from the Base64 string
    if isinstance(base64_image, str) and base64_image.startswith('data:image'):
        encoded_image = base64_image.split('base64,')[1]
        image_bytes = base64.b64decode(encoded_image)
        st.image(image_bytes)
    else:
        print('Não é valido: ', type(base64_image), base64_image)
    # st.image(value)

    file = st.file_uploader('This is a file uploader 1', type=['png', 'jpg'], key='get-image-ctrl-v1')
    button1 = st.button('Test Button', type="secondary")


if __name__ == "__main__":
    main()
