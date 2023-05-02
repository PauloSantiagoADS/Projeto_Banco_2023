const add = document.querySelector('.add');


add.addEventListener('click',()=>{
    const frm = document.querySelector('.form')
        if (frm.style.display !== 'flex') {
            frm.style.display = 'Flex'
        }else{
            frm.style.display = 'none'
        }
})