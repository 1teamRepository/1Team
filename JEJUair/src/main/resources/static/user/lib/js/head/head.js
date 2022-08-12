
    //로그인, 로그아웃 시 상단 헤더의 메뉴 변화
    let memPoint = document.getElementById("memPoint").innerText

    console.log(memPoint)
    if(memPoint !== ""){
    let logout_visible = document.getElementById("logout_visible")
    let login_visible = document.getElementById("login_visible")

    login_visible.style.display = "block"
    logout_visible.style.display = "none"

} else{
    let logout_visible = document.getElementById("logout_visible")
    let login_visible = document.getElementById("login_visible")

    login_visible.style.display = "none"
    logout_visible.style.display = "block"
}

    //로그아웃
    let logout = document.getElementById("logout")

    logout.onclick = function logOut(){
    location.href = "/user/logout"
}

