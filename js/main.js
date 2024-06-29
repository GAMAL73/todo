let task=document.getElementById('input')
let btn=document.getElementById('btn')
let add=document.getElementById('add')
let loding=document.getElementById('loding')
btn.addEventListener('click',function(){
    var taskop={
        title:task.value,
        apiKey: "66803b2960a208ee1fdc0f29"
    }
    addtodo(taskop)
})
async function addtodo(taskop) {
    let data=await fetch('https://todos.routemisr.com/api/v1/todos',{
        method:'post',
        body:JSON.stringify(taskop),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let res=await data.json()
    if(res.message=='success'){
        gettodo()
    }
    console.log(res)
}
async function gettodo() {
    loding.style.display='block'
    task.style.display='none'
    let data=await fetch('https://todos.routemisr.com/api/v1/todos/66803b2960a208ee1fdc0f29')
    let res=await data.json()
    console.log(res)
    if(res.message=='success'){
        display(res.todos)
        loding.style.display='none'
        task.style.display='block'
    }
}
gettodo()
async function deletetodo(id) {
    let data=await fetch('https://todos.routemisr.com/api/v1/todos',{
        method:'delete',
        body:JSON.stringify({todoId:id}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let res=await data.json()
    if(res.message=='success'){
        gettodo()
    }
    console.log(res)
}
async function checktodo(id) {
    let data=await fetch('https://todos.routemisr.com/api/v1/todos',{
        method:'put',
        body:JSON.stringify({todoId:id}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let res=await data.json()
    if(res.message=='success'){
        gettodo()
    }
    console.log(res)
}
function display(data){
    cartona=``
    for(let i=0;i<data.length;i++){
        cartona+=`
                        <div class="d-flex tasks w-75 my-2 rounded-4 m-auto px-3 py-2 bg-dark shadow bg-dark text-white justify-content-between align-items-center">
                    <p class="m-0 p-0${data[i].completed ?  ' text-decoration-line-through':''}">${data[i].title}</p>

                    <div class="icon d-flex">
                        <i onclick="checktodo('${data[i]._id}')" class="${data[i].completed ?  'd-none':''} m-2 fas fa-check-circle"></i>
                        <i onclick="deletetodo('${data[i]._id}')" class="m-2 fas fa-trash"></i>
                    </div>
                </div>`
    }
    document.getElementById('add').innerHTML=cartona
}