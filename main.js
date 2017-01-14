


Keycodes= {
    command: 27
}


onkeydown = function(e){
    console.log(e);
    command = e.metaKey || e.ctrlKey;
    console.log(command && e.keyCode == 'S'.charCodeAt(0));
    if(command && e.keyCode == 'S'.charCodeAt(0)){
        e.preventDefault();
        alert("TET")
    }
};

window.addEventListener(onkeydown);
// window.addEventListener("keydown", function(e){
//
//     command = (e.metaKey ? '⌘-' : '') + String.fromCharCode(e.keyCode)
//     console.log(String.fromCharCode(e.keyCode))
// });

combinations= {
    "": "UNDO",
    "": "REDO",
    "": "SELECT_SEARCHBAR"
};
