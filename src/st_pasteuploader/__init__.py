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
    component_value = _component_func(
        label=label,
        value=value,
        key=key,
        default=value
    )

    return component_value


def main():
    st.write("## Example")
    value = st_pasteuploader("This is a label!")

    st.write(value)

    file = st.file_uploader('This is a file uploader 1', type=['png', 'jpg'], key='get-image-ctrl-v1')
    file = st.file_uploader('This is a file uploader 2', type=['png', 'jpg'], key='get-image-ctrl-v2')


if __name__ == "__main__":
    main()
