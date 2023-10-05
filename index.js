const input_el = document.getElementById("input-el")
const save_btn = document.getElementById("save-btn")
const delete_btn = document.getElementById("delete-btn")
const ul_el = document.getElementById("ul-el")
const tab_btn = document.getElementById("tab-btn")
let links = []

const local_storage_links = JSON.parse(localStorage.getItem("links"))
if(local_storage_links){
    render(local_storage_links)
}

save_btn.addEventListener("click", function(){
    links.push(input_el.value)
    input_el.value = ""
    localStorage.setItem("links", JSON.stringify(links))    
    render(links)
})

function render(my_list){
    let list_items = ""
    for(let i=0; i<my_list.length; i++){
        list_items += `<li> 
                            <a href="${my_list[i]}", target="_blank">${my_list[i]} </a>
                        </li>`
    }
    ul_el.innerHTML = list_items
}


delete_btn.addEventListener("dblclick", function(){
    localStorage.clear()
    links = []
    render(links)
})

tab_btn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        links.push(tabs[0].url)
        localStorage.setItem("links", JSON.stringify(links) )
        input_el.value = tabs[0].url
        render(links)
    })
})



const infoBox = document.getElementById("info-box");
//Event listener for mouseover
delete_btn.addEventListener("mouseover", function() {
    infoBox.textContent = "Double click to DELETE ALL!";
});
//Event listener for mouseout
delete_btn.addEventListener("mouseout", function() {
    infoBox.textContent = ""; // Clear the info when the cursor moves away
});
