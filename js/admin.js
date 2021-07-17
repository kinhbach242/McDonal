const url = 'http://localhost:3000/';

const fetchAndShowData = async function fetchAndShowData(url, options, cb){
    try{
        let res = await fetch(url, options)
        let datas = await res.json()
        return cb(datas)
    }
    catch(err){
        console.log(err)
    }
}
const getAdminItem = async function getAdminItem() {
    const ItemUrl= url + 'products'
    const options={
        method: "GET"
    }
    fetchAndShowData(ItemUrl, options, showAdminItem)
}
const getAdminChart = async function getAdminChart() {
    const chartUrl= url + 'cat'
    const options={
        method: "GET"
    }
    fetchAndShowData(chartUrl, options, showAdminChart)
}
const showAdminItem  = (itemAdmin) =>{
    const showItem= document.querySelector('.tableItem')
    let html = `<table class="rwd-table">
    <tr>
    <th>ID</th>
    <th>Tên sản phẩm</th>
    <th>Hình ảnh</th>
    <th>Giá bán</th>
    <th>Quản lý</th>
    </tr>`
    itemAdmin.forEach(item=> {
        html += `<tr>
        <td data-th="id">${item.id}</td>
        <td data-th="title">${item.title}</td>
        <td data-th="img"><img width="100px"src="${item.image}" alt=""></td>
        <td data-th="price">${item.price} VNĐ</td>
        <td data-th="manage"><button style="margin-right: -10px;"type="button" class="btn btn-outline-light">Xóa</button>
            <button type="button" class="btn btn-outline-light">Sửa</button>
        </td>
        </tr>`
    })
    html+= `</table> `
    showItem.innerHTML= html;
}
const getAdminCategories = async function getAdminCategories(){
    const categoriesUrl= url + 'cat'
    const options={
        method: "GET"
    }
    fetchAndShowData(categoriesUrl, options, showAdminCat)
}

const showAdminCat = (catAdmin) =>{
    const showCat = document.querySelector('.tableAM')
    let html= `
        <table class="rwd-table">
            <tr>
            <th>Tên loại</th>
            <th>Đã bán</th>
            <th >Chức năng</th>
            </tr>`
    catAdmin.forEach(cat => {
        html += `<tr>
        <td data-th="title">${cat.nameCat}</td>
        <td data-th="daBan">${cat.daBan}</td>
        <td data-th="manage"><button type="button" class="btn btn-outline-light">Xóa</button>
            <button type="button" class="btn btn-outline-light">Sửa</button>
        </td>
        </tr>`
        
    });
    html += `</table> ` 
    showCat.innerHTML = html;
}
const showAdminChart= (chartAdmin) =>{
    const showChart= document.querySelector('.chart')
    let html= `
    <main class="chartdata">
    <div class="pieID pie">
      
    </div>
    <ul class="pieID legend">`
    chartAdmin.forEach (chart=>{
        html += `<li>
        <em>${chart.nameCat}</em>
        <span>${chart.daBan}</span>
      </li>`
    })
    html+= ` </ul>
    </main>
`
showChart.innerHTML= html;
}

export{
    getAdminCategories,
    getAdminItem,
    getAdminChart,
}