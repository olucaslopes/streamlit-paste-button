from pathlib import Path
from typing import Optional

import streamlit as st
import streamlit.components.v1 as components

from dataclasses import dataclass
from PIL import Image
import io
import base64
import re

# Tell streamlit that there is a component called streamlit_paste_button,
# and that the code to display that component is in the "frontend" folder
frontend_dir = (Path(__file__).parent / "frontend").absolute()
_component_func = components.declare_component(
    "streamlit_paste_button", path=str(frontend_dir)
)


@dataclass
class PasteResult:
    """Dataclass to store output of Javascript Component.

    Attributes
    ----------
    image_data: PIL.Image
        The image data.
    """

    image_data: Image = None


def _data_url_to_image(data_url: str) -> Image:
    """Convert base64 data string an Pillow Image"""
    _, _data_url = data_url.split(";base64,")
    return Image.open(io.BytesIO(base64.b64decode(_data_url)))


# Create the python function that will be called
def paste_image_button(
        label: str,
        text_color: Optional[str] = "#ffffff",
        background_color: Optional[str] = "#3498db",
        hover_background_color: Optional[str] = "#2980b9",
        key: Optional[str] = 'paste_button',
        errors: Optional[str] = 'ignore'
) -> PasteResult:
    """
    Create a button that can be used to paste an image from the clipboard.

    Parameters
    ----------
    label : str
        The label to display next to the component.
    text_color : str, optional
        The color of the text, by default "#ffffff"
    background_color : str, optional
        The background color of the button, by default "#2980b9"
    hover_background_color : str, optional
        The background color of the button when hovered, by default "#2980b9"
    key : str, optional
        An optional string to use as the unique key for the widget. Defaults to 'paste_button'.
    errors: str {‘raise’, ‘ignore’}, optional
        If ‘raise’, then invalid input will raise an exception.
        If ‘ignore’, then invalid input will return the input.
        Default is ‘ignore’.


    Returns
    -------
    base64_image : PasteResult
        The image data.
    """
    component_value = _component_func(
        label=label,
        text_color=text_color,
        background_color=background_color,
        hover_background_color=hover_background_color,
        key=key
    )

    if component_value is None:
        return PasteResult()
    elif component_value.startswith('error'):
        if errors == 'raise':
            if component_value.startswith('error: no image'):
                st.error('**Error**: No image found in clipboard', icon='🚨')
            else:
                st.error(re.sub('error: (.+)(: .+)', r'**\1**\2', component_value), icon='🚨')
        return PasteResult()
    return PasteResult(
        image_data=_data_url_to_image(component_value)
    )
