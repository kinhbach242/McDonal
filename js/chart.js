import { fetchAPI } from './module.js'
const url = 'http://localhost:3000/'
const chartMonth = async function chartMonth(){
    try{
        const ordersDetailUrl = url + 'orderDetail'
        const options = {
            method:"GET"
        }
        let ordersDetail = await fetchAPI(ordersDetailUrl, options)
        let nameProducts = []
        let quantity = []
        let temp_arr = [...ordersDetail];
        let obj = {};
        temp_arr.forEach((item) => {
            obj[item.product.title] =  obj[item.product.title] + item.product.quantity || item.product.quantity;
        });
        for(let order in obj ){
            nameProducts.push(order)
            quantity.push(obj[order])
        }
        
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nameProducts,
                datasets: [{
                    label: '# of Votes',
                    data: quantity,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    catch(err){
        console.log(err)
    }
}
chartMonth()