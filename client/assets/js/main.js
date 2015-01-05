/**
 *判断输入的数字是否为中奖号码
 *
 *
 */

$(function() {
    if (!Array.indexOf) {
    Array.prototype.indexOf = function(obj) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == obj) {
          return i;
        }
      }
      return -1;
    }
  }

    $(".input-number").keydown(function(event) {
        if (event.which == 13) {
            binding();
            return false;
        }
    });

    $('#commitButton').on('click ', binding);

    $('.modal').on('click', function() {
    setTimeout(function() {
      $('.modal').css('display', 'none');
    }, 800);
  });

    $('.close').on('click', function() {
    $('.modal').css("display", 'none');
  });

    $(document).ready(function() {
        $('#orderNumInput').focus();
    });
});

// 对QQ号和订单号进行绑定，并对返回信息做处理
function binding() {
    var orderNum = $('#orderNumInput').val().trim(),
        qq       = $('#qqInput').val().trim();

    $.ajax({
        url       : '/binding',
        type      : 'post',
        dataType  : 'json',
        data      : {
            order_num : orderNum,
            qq        : qq
        }
    }).done(function (result) {
        if (result.status === 'success'){
            if (isIE()) {
                alert('恭喜您，您的QQ号已经登记成功，稍后会有工作人员给您发放QQ黄钻特权，添加微信号：bigertech，发奖第一时间告诉你。');
                return false;
            }
            if (parseInt(result.remain)){
                $('#remainMessage').text('(您的订单号还能领取 '+ result.remain +' 次)');
            }else{
                $('#remainMessage').text('');
            }
            showMask("1");
        }else{
            if (isIE()) {
                alert('很抱歉，' + result.message + '添加微信号：bigertech，还有福利在那等你哦');
                return false;
            }
            $('#failMessage').text('很抱歉，' + result.message);
            showMask("0");
        }
    }).fail(function (err) {
        console.log(err);
    });
}

function isIE() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            return true;
        }
        if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
            return true;
        }
        if (navigator.userAgent.indexOf("MSIE 8.0") > 0) { //这里是重点，你懂的
            return true;
        }
    }
    return false;
}

//显示模板
function showMask(status) {
    var hall = window.innerHeight;
    var width = window.innerWidth;
    var hWindow = $(".modal-main").outerHeight() + 20;
    var wWindow = $(".modal-main").outerWidth() + 20;

    $(".modal-main").css("left", (width - wWindow) / 2);
    $(".modal-main").css("top", (hall - hWindow) / 2);

    if (status === "0") {
        $(".modal-failed").css("display", 'block');
    } else if (status === "1") {
        $(".modal-succeed").css("display", 'block');
    }
}