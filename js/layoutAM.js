const adminEl= document.getElementById('layoutAM')
const adminHTML = `
<div class="page-wrapper chiller-theme toggled">
<a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
<i class="fas fa-bars"></i>
</a>
<nav id="sidebar" class="sidebar-wrapper">
<div class="sidebar-content">
    <div class="sidebar-brand">
    <a href="#">McDonald's Admin</a>
    <div id="close-sidebar">
        <i class="fas fa-times"></i>
    </div>
    </div>
    <div class="sidebar-header">
    <div class="user-pic">
        <img class="img-responsive img-rounded" src="./images/admin/avt.jpg" alt="User picture">
    </div>
    <div class="user-info">
        <span class="user-name">Bạch Đường Kính
        </span>
        <span class="user-role">Administrator</span>
        <span class="user-status">
        <i class="fa fa-circle"></i>
        <span>Online</span>
        </span>
    </div>
    </div>
    <!-- sidebar-header  -->
    <div class="sidebar-search">
    <div>
        <div class="input-group">
        <input type="text" class="form-control search-menu" placeholder="Tìm kiếm">
        <div class="input-group-append">
            <span class="input-group-text">
            <i class="fa fa-search" aria-hidden="true"></i>
            </span>
        </div>
        </div>
    </div>
    </div>
    <!-- sidebar-search  -->
    <div class="sidebar-menu">
    <ul>
        <li class="header-menu">
        <span>Chung</span>
        </li>
        <li class="sidebar-dropdown">
        <a href="#">
            <i class="fa fa-tachometer-alt"></i>
            <span>Quản lí</span>
            <span class="badge badge-pill badge-warning">New</span>
        </a>
        <div class="sidebar-submenu">
            <ul>
            <li>
                <a href="cat-list.html">Loại sản phẩm
                </a>
            </li>
            <li>
                <a href="product-list.html">Sản phẩm</a>
            </li>
            </ul>
        </div>
        </li>
        <li class="sidebar-dropdown">
            <a href="#">
                <i class="fa fa-chart-line"></i>
                <span>Phân tích doanh số</span>
            </a>
            <div class="sidebar-submenu">
                <ul>
                <li>
                    <a href="chart.html">Sản phẩm bán chạy</a>
                </li>
                </ul>
            </div>
            </li>

            <li class="sidebar">
            <a href="index.html">
              <i class="fas fa-store-alt"></i>
                <span>Quay về cửa hàng</span>
            </a>
            </li>
            
<!-- sidebar-content  -->
<div class="sidebar-footer">
    <a href="#">
    <i class="fa fa-bell"></i>
    <span class="badge badge-pill badge-warning notification">3</span>
    </a>
    <a href="#">
    <i class="fa fa-envelope"></i>
    <span class="badge badge-pill badge-success notification">7</span>
    </a>
    <a href="#">
    <i class="fa fa-cog"></i>
    <span class="badge-sonar"></span>
    </a>
    <a href="#">
    <i class="fa fa-power-off"></i>
    </a>
</div>
</nav>
<!-- sidebar-wrapper  -->
<!-- page-content" -->
</div>`
adminEl.insertAdjacentHTML('afterbegin',adminHTML);
$(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });
  
  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });


  