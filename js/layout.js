const headerEl= document.getElementById('header')
const headerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container-fluid">
    <img class="navbar-brand" href="index.html" src="./images/logo-mcdonalds.png" alt="">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html">TRANG CHỦ</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">KHUYẾN MÃI</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="shop.html">SẢN PHẨM</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">TIN TỨC</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">LIÊN HỆ</a>
            </li>
        </ul>
        <div class="btnNav">
            <button type="button" data-cart="0" onclick="window.location.href='cart.html'" class="btnWN btn icon-cart btn-outline-warning"><i class="fas fa-cart-plus"></i></button>
            <button type="button" class="btnWN btn btn-outline-warning"><i class="fas fa-search"></i></button>
            <button type="button" onclick="window.location.href='admin_cat.html'" class="btnWN btn btn-outline-warning"><i class="fas fa-user-alt"></i></i></button>
        </div>
    </div>
</div>
</nav>`

headerEl.insertAdjacentHTML('afterbegin',headerHTML);

const footerEl= document.getElementById('footer')
const footerHTML= `<div class="footer-left">
<p>Tìm hiểu</p>
<ol class="site-nav">
    <li class="site-nav__item"><a class="site-nav__link" href="#">Lịch sử McDonald's</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">Giới thiệu McDonald's Việt Nam</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">Xuất xử</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">Nhà cung cấp</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">Dịch vụ</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">An toàn thực phẩm</a></li>
</ol>
</div>
<div class="footer-left">
<p>Cơ hội nghề nghiệp</p>
<ol class="site-nav">
    <li class="site-nav__item"><a class="site-nav__link" href="#">Thông tin tuyển dụng</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">Khu vực TPHCM</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">Khu vực Hà Nội</a></li>
</ol>
</div>
<div class="footer-left">
<p>Chính sách</p>
<ol class="site-nav">
    <li class="site-nav__item"><a class="site-nav__link" href="#">Các câu hỏi thường gặp</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">Điều khoản và Điều kiện</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">Chính sách và quyền riêng tư</a></li>
</ol>
<div class="icon">
    <img style="width: 50px" height="33px" src="./images/iconfooter/United_States.webp" alt="">
    <img style="width: 50px" src="./images/iconfooter/Vietnam.jpg" alt="">
</div>
</div>
<div class="footer-left">
<p>Liên hệ với chúng tôi</p>
<ol class="site-nav">
    <li class="site-nav__item"><a class="site-nav__link" href="#">Liên hệ</a></li>
    <li class="site-nav__item"><a class="site-nav__link" href="#">Phản hồi chất lượng dịch vụ</a></li>
</ol>
<div class="icon">
    <img style="width: 40px" src="./images/iconfooter/facebook.png" alt="">
    <img style="width: 40px" src="./images/iconfooter/gmail.png" alt="">
    <img style="width: 40px" src="./images/iconfooter/tải xuống.png" alt="">
</div>
</div>`
footerEl.insertAdjacentHTML('afterbegin',footerHTML);