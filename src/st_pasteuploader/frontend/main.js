// The `Streamlit` object exists because our html file includes
// `streamlit-component-lib.js`.
// If you get an error about "Streamlit" not being defined, that
// means you're missing that file.

function sendValue(value) {
  Streamlit.setComponentValue(value)
}

async function parseClipboardData(imagecontainer) {
            const item = await navigator.clipboard.read().catch((err) => {
                console.error(err);
            })
            sendValue(item[0])
        }

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event) {
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {
    // You most likely want to get the data passed in like this
    // const {input1, input2, input3} = event.detail.args

    // Grab the label and default value that the user specified
    const {label, value} = event.detail.args;


    // Capture paste button
    const paste_button = document.getElementById("paste_button");

    // On the keyup event, send the new value to Python
    paste_button.onclick = event => {
      parseClipboardData(paste_button)
    };

    // You'll most likely want to pass some data back to Python like this
    // sendValue({output1: "foo", output2: "bar"})
    window.rendered = true
  }
}

// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()
// Render with the correct height, if this is a fixed-height component
Streamlit.setFrameHeight(85)

//    // Grab the label and default value that the user specified
//    const {label, value} = event.detail.args;
//
//    // Find the file uploader container
//    const element = document.querySelector("[aria-label='${label}']")
//
//    document.onpaste = (evt) => {
//      const dT = evt.clipboardData || window.clipboardData;
//      const file = dT.files[ 0 ];
//      sendValue(file)
//    };
//
////   element.onpaste = async (evt) => {
////    const auth = await navigator.permissions.query( { name: "clipboard-read" } );
////    if( auth.state !== 'denied' ) {
////    const item_list = await navigator.clipboard.read();
////    let image_type; // we will feed this later
////    const item = item_list.find( item => // choose the one item holding our image
////      item.types.some( type => { // does this item have our type
////        if( type.startsWith( 'image/' ) ) {
////          image_type = type; // store which kind of image type it is
////          return true;
////        }
////      } )
//    );
////    const file = item && await item.getType( image_type );
////    console.log( file );
////  }
////};
//
//
//    // On the keyup event, send the new value to Python
//    input.onkeyup = event => sendValue(event.target.value)