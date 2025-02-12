
// 本地音频文件路径
const audioFiles = [
    {
        name: 'Dark Side Of The Moon',
        artist: 'levi',
        url: './music/Dark Side Of The Moon-神谷浩史.mp3', // 替换为你的本地音乐文件路径
        lrc: './music/Dark Side Of The Moon-神谷浩史.lrc',
        cover: 'touxiang.png' // 替换为对应封面图路径
    },
    {
        name: 'Call Your Name',
        artist: 'levi',
        url: './music/Call your name _Gv_-泽野弘之.mp3', // 替换为你的本地音乐文件路径
        lrc: './music/Call your name _Gv_-泽野弘之.lrc',
        cover: 'touxiang.png' // 替换为对应封面图路径
    },
    {
        name: 'Call of Silence',
        artist: 'levi',
        url: './music/Call of Silence-泽野弘之.mp3', // 替换为你的本地音乐文件路径
        lrc: './music/Call of Silence-泽野弘之.lrc',
        cover: 'touxiang.png' // 替换为对应封面图路径
    },
    {
        name: '自由の翼-Linked Horizon',
        artist: 'levi',
        url: './music/自由の翼-Linked Horizon.mp3', // 替换为你的本地音乐文件路径
        lrc: './music/自由の翼-Linked Horizon.lrc',
        cover: 'touxiang.png' // 替换为对应封面图路径
    },
    {
        name: 'The Dogs-泽野弘之',
        artist: 'levi',
        url: './music/The Dogs-泽野弘之.mp3', // 替换为你的本地音乐文件路径
        lrc: './music/The Dogs-泽野弘之.lrc',
        cover: 'touxiang.png' // 替换为对应封面图路径
    }

];
/* 底栏歌词 */
setInterval(function () {
    $("#lrc").html("<span class='lrc-show'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'><path fill='none' d='M0 0h24v24H0z'/><path d='M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z' fill='rgba(255,255,255,1)'/></svg>&nbsp;" + $(".aplayer-lrc-current").text() + "&nbsp;<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'><path fill='none' d='M0 0h24v24H0z'/><path d='M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z' fill='rgba(255,255,255,1)'/></svg></span>");
}, 500);
// 初始化 APlayer
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    order: 'random',
    preload: 'auto',
    listMaxHeight: '336px',
    volume: '0.5',
    mutex: true,
    lrcType: 3,
    audio: audioFiles,
});

/* 音乐通知及控制 */
ap.on('play', function () {
    music = $(".aplayer-title").text() + $(".aplayer-author").text();
    iziToast.info({
        timeout: 4000,
        icon: "fa-solid fa-circle-play",
        displayMode: 'replace',
        message: music
    });
    $("#play").html("<i class='fa-solid fa-pause'>");
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
    if ($(document).width() >= 990) {
        $('.power').css("cssText", "display:none");
        $('#lrc').css("cssText", "display:block !important");
    }
});

ap.on('pause', function () {
    $("#play").html("<i class='fa-solid fa-play'>");
    if ($(document).width() >= 990) {
        $('#lrc').css("cssText", "display:none !important");
        $('.power').css("cssText", "display:block");
    }
});

$("#music").hover(function () {
    $('.music-text').css("display", "none");
    $('.music-volume').css("display", "flex");
}, function () {
    $('.music-text').css("display", "block");
    $('.music-volume').css("display", "none");
});

/* 一言与音乐切换 */
$('#open-music').on('click', function () {
    $('#hitokoto').css("display", "none");
    $('#music').css("display", "flex");
});

$("#hitokoto").hover(function () {
    $('#open-music').css("display", "flex");
}, function () {
    $('#open-music').css("display", "none");
});

$('#music-close').on('click', function () {
    $('#music').css("display", "none");
    $('#hitokoto').css("display", "flex");
});

/* 上下曲 */
$('#play').on('click', function () {
    ap.toggle();
    /*$("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());*/
});

$('#last').on('click', function () {
    ap.skipBack();
    ap.play();
    /*$("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());*/
});

$('#next').on('click', function () {
    ap.skipForward();
    ap.play();
    /*$("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());*/
});

window.onkeydown = function (e) {
    if (e.keyCode == 32) {
        ap.toggle();
    }
}

/* 打开音乐列表 */
$('#music-open').on('click', function () {
    if ($(document).width() >= 990) {
        $('#box').css("display", "block");
        $('#row').css("display", "none");
        $('#more').css("cssText", "display:none !important");
    }
});

//音量调节
$("#volume").on('input propertychange touchend', function () {
    let x = $("#volume").val();
    ap.volume(x, true);
    if (x == 0) {
        $("#volume-ico").html("<i class='fa-solid fa-volume-xmark'></i>");
    } else if (x > 0 && x <= 0.3) {
        $("#volume-ico").html("<i class='fa-solid fa-volume-off'></i>");
    } else if (x > 0.3 && x <= 0.6) {
        $("#volume-ico").html("<i class='fa-solid fa-volume-low'></i>");
    } else {
        $("#volume-ico").html("<i class='fa-solid fa-volume-high'></i>");
    }
});

