from pathlib import Path

import setuptools

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setuptools.setup(
    name="streamlit-paste-button",
    version="0.1.0",
    author="Lucas Lopes Amorim",
    author_email="lucaslopesamorim@gmail.com",
    description=("Streamlit component that allows you to paste images from your clipboard into your app with a button "
                 "click"),
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(where="src"),
    package_dir={"": "src"},
    include_package_data=True,
    license="MIT",
    keywords="streamlit, component, paste, image, clipboard",
    url="https://github.com/olucaslopes/streamlit-paste-button",
    project_urls={
            "Documentation": "https://github.com/olucaslopes/streamlit-paste-button/blob/main/README.md",
            "Issue Tracker": "https://github.com/olucaslopes/streamlit-paste-button/issues",
        },
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Topic :: Desktop Environment",
        "Topic :: Multimedia :: Graphics",
        "Topic :: Software Development :: User Interfaces",
    ],
    python_requires=">=3.7",
    install_requires=["streamlit>=1.2", "jinja2", "pillow"],
)
