/* 自定义配置 */
/* 尚未完善 */
$(function () {
    let url = "../setting.json"
    $.getJSON(
        url,
        function (data) {
            /* 页头数据 */
            $('title').text(data.title);
            $('#loading-title').html(data.title);
            $("meta[name='description']").attr('content', data.description);
            $("meta[name='keywords']").attr('content', data.keywords);
            $("meta[name='author']").attr('content', data.author);
            /* 基础信息 */
            $("#logo-img").attr("src", data.logo_img);
            $('#logo-text-1').html(data.logo_text_1);
            $('#logo-text-2').html(data.logo_text_2);
            $('#logo-title-other').html(data.logo_text_1);
            $('#logo-title-other-small').html("." + data.logo_text_2);
            $('#logo-text-small').html(data.logo_text_1 + "." + data.logo_text_2);
            /* 社交链接 */
            /* 快捷链接 */
            $('#link-url-1').attr('href', data.link_1[0]);
            $('#link-icon-1').attr('class', data.link_1[1]);
            $('#link-name-1').html(data.link_1[2]);
            $('#link-url-2').attr('href', data.link_2[0]);
            $('#link-icon-2').attr('class', data.link_2[1]);
            $('#link-name-2').html(data.link_2[2]);
            $('#link-url-3').attr('href', data.link_3[0]);
            $('#link-icon-3').attr('class', data.link_3[1]);
            $('#link-name-3').html(data.link_3[2]);
            $('#link-url-4').attr('href', data.link_4[0]);
            $('#link-icon-4').attr('class', data.link_4[1]);
            $('#link-name-4').html(data.link_4[2]);
            $('#link-url-5').attr('href', data.link_5[0]);
            $('#link-icon-5').attr('class', data.link_5[1]);
            $('#link-name-5').html(data.link_5[2]);
            $('#link-url-6').attr('href', data.link_6[0]);
            $('#link-icon-6').attr('class', data.link_6[1]);
            $('#link-name-6').html(data.link_6[2]);
            //页脚版权
        }
    )
});

// 背景图片 Cookies 
function setBgImg(bg_img) {
    if (bg_img) {
        Cookies.set('bg_img', bg_img, {
            expires: 36500
        });
        return true;
    }
    return false;
};

// 获取背景图片 Cookies
function getBgImg() {
    let bg_img_local = Cookies.get('bg_img');
    if (bg_img_local && bg_img_local !== "{}") {
        return JSON.parse(bg_img_local);
    } else {
        setBgImg(bg_img_preinstall);
        return bg_img_preinstall;
    }
}

let bg_img_preinstall = {
    "type": "1", // 1:默认背景 2:每日一图 3:随机风景 4:随机动漫
};

// 更改背景图片
function setBgImgInit() {
    let bg_img = getBgImg();
    // 选中对应壁纸类型的单选按钮
    $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").click();

    switch (bg_img["type"]) {
        case "1":
            // 定义一个函数，用于随机切换壁纸
            function setRandomWallpaper() {
                // 1 + ~~(Math.random() * 2) 会在 1、2 之间随机选一个
                // 对应 background1.jpg 或 background2.jpg
                $('#bg').attr('src', `./img/background${1 + ~~(Math.random() * 8)}.jpg`);
            }

            // 第一次立即设置壁纸
            setRandomWallpaper();

            // 每 30 秒随机更换一次壁纸
            setInterval(function() {
                setRandomWallpaper();
            }, 10000);

            break;
    }
};

$(document).ready(function () {
    // 壁纸数据加载
    setBgImgInit();
    // 设置背景图片
    $("#wallpaper").on("click", ".set-wallpaper", function () {
        let type = $(this).val();
        let bg_img = getBgImg();
        bg_img["type"] = type;
        iziToast.show({
            icon: "fa-solid fa-image",
            timeout: 2500,
            message: '壁纸设置成功，刷新后生效',
        });
        setBgImg(bg_img);
    });
});