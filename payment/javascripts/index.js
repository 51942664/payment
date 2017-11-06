/**
 * 功能：索引页功能
 * 日期：2017-8-21
 **/
/*************************************/
/* 全局变量定义部分 */
/*************************************/
/* 支付信息对象 */
var payObj = {
    name: "",
    money: 0
};

/*************************************/
/* 页面加载完成后执行的功能（函数目录） */
/*************************************/
window.onload = function() {
    // =============================
    // 功能流程
    // =============================
    // 调用“生成列表”函数(2)
    createList(friendData);
    // 调用“为列表项绑定点击页面“跳转”事件”函数(4)
    toPayPage();

    // 调用“密码组件相关功能”函数(6)
    passwordComponent();
    // 密码输入事件


    // =============================
    // 全局功能工具函数
    // =============================
    // 返回按钮事件函数调用
    prevPage();
};

/*************************************/
/* 函数定义部分（函数内容） */
/*************************************/
/**
 * 功能：生成列表(1)
 * 参数：需要的原始数据（Array-Object）
 **/
function createList(data) {
    // 获取列表容器
    var friendList = document.getElementById("friend-list");
    // 获取数据长度
    var data_length = data.length;
    // 通过for循环遍历出列表
    for(var i = 0; i < data_length; i++) {
        friendList.innerHTML += '<li>' +
            '<img src="' + data[i].photoURL + '">' +
            '<span>' + data[i].name + '</span>' +
            '<i data-arrow="right">&gt;</i>' +
            '</li>';
    }
}

/**
 * 功能：页面“跳转”
 * 参数：需要跳转到的页面索引（Number）
 **/
function nextPage(pageNum) {
    var page = document.getElementsByTagName("page")[pageNum];
    page.style.left = "0";
    page.style.boxShadow="0 0 12px rgba(0,0,0,0.2)";
    //延迟600ms毫秒执行
    setTimeout(function () {
        //清楚阴影
        page.style.boxShadow ="none";
    },600);
}

/**
 * 功能：页面“返回”
 * 参数：需要返回的页面索引（Number）
 **/
function prevPage() {
    var backBtn = document.getElementsByTagName("back"),
        backBtn_length = backBtn.length;
    for(var i = 0; i < backBtn_length; i++) {
        backBtn[i].onclick = function() {
            // 找到当前“返回”按钮对应的父级“页面”
            var currentPage = this.parentElement.parentElement;
            // “返回上一页”（实际上是让本页向右移出窗口）
            currentPage.style.left = "100%";
        };
        page.style.boxShadow="0 0 12px rgba(0,0,0,0.2)";
        //延迟600ms毫秒执行
        setTimeout(function () {
            //清除阴影
            page.style.boxShadow ="none";
        },600);
    }
}

/**
 * 功能：为列表项绑定点击页面“跳转”事件(3)
 **/
function toPayPage() {
    var friendItem = document.getElementsByTagName("li"),
        friendItem_length = friendItem.length;
    // 通过循环绑定点击跳转事件
    for(var i = 0; i < friendItem_length; i++) {
        friendItem[i].index = i;
        friendItem[i].onclick = function() {
            //清空临时对象数据
            payObj.name = "";
            payObj.money =0;
            //清空所有的输入框
            var input = document.getElementsByTagName("input"),
                input_length =input.length;
            for(var j=0;j<input_length;j++){
                input[j].value="";
            }
            // 跳转到第二页
            nextPage(1);
            // 获取当前用户的名称
            payObj.name = friendData[this.index].name;
            // 收款人显示元素1
            var payee_1 = document.getElementById("payee_1");
            // 设置收款人显示1
            payee_1.textContent = payObj.name;
        }
    }
}

/**
 * 功能：密码组件相关功能(5)
 **/
function passwordComponent() {
    // 获取支付按钮
    var payMoney = document.getElementById("payMoney");
    // 点击支付按钮的事件
    payMoney.onclick = function() {
        // 获取输入金额
        var numPayMoney = document.getElementById("numPayMoney"),
            numPayMoney_val = Number(numPayMoney.value);
        // 大于5000
        if(numPayMoney_val > 5000) {
            alert("单日交易不能超过5000元");
            return;
        }
        // 小于0.01
        else if(numPayMoney_val < 0.01) {
            alert("交易金额不得低于0.01元");
            return;
        }
        // 将转账金额存储起来
        payObj.money = numPayMoney_val;

        // 显示出密码控件
        var showComponet = document.getElementsByTagName("component")[0];
        showComponet.innerHTML ='<div class="pwdComponet">' +
            '<div class="masklaer"></div>' +
            '<div class="payInfo">' +
            '<div class="payInfo-panel">' +
            '<h3>' +
            '<i class="closePwdComponent">×</i>' +
            '<span>请输入支付密码</span>' +
            '</h3>' +
            '<div>' +
            '<p class="mt-15">向<span class="payee">' +
            payObj.name +
            '</span>转账</p>' +
            '<p class="fz-36 mt-5">￥<span>' +
            payObj.money.toFixed(2) +
            '</span></p>' +
            '</div>' +
            '<div id="pwdInput">' +
            '<div class="error"></div>' +
            '<div class="paypwdbox">' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="numKeyboard">' +
            '<div class="numKey">7</div>' +
            '<div class="numKey">8</div>' +
            '<div class="numKey">9</div>' +
            '<div class="numKey">4</div>' +
            '<div class="numKey">5</div>' +
            '<div class="numKey">6</div>' +
            '<div class="numKey">1</div>' +
            '<div class="numKey">2</div>' +
            '<div class="numKey">3</div>' +
            '<div></div>' +
            '<div class="numKey">0</div>' +
            '<div class="deleteKey">←</div>' +
            '</div>' +
            '</div>';
        // 通过调整组件层级来进行显示
        showComponet.style.zIndex = "10";

        // 获取所有的数字键
        var numKeyArr = document.getElementsByClassName("numKeyboard")[0].getElementsByClassName("numKey"),
            numKeyArr_length = numKeyArr.length;
        // 获取所有的“密码值”容器
        var pwdValDiv = document.getElementsByClassName("paypwdbox")[0].children;
        // 点击次数计数器
        var numkeyCount = 0;
        // 当前密码值的数组
        var currentPwd = [];
        // 为所有数字键绑定点击事件
        for(var i = 0; i < numKeyArr_length; i++) {
            numKeyArr[i].onclick = function() {
                // 如果点击次数等于6的时候中止操作
                if(numkeyCount === 6) {
                    return;
                }
                // 添加“密码值”
                pwdValDiv[numkeyCount].innerHTML = '<i></i>';
                // 获取当前输入的值
                var keyText = this.textContent;
                // 把获取到的值存入数组
                currentPwd.push(keyText);
                // 如果数组长度为6的时候，进行输入验证
                if(currentPwd.length === 6) {
                    // 验证成功
                    if(originPassword === currentPwd.join("")) {
                        // 移除密码组件
                        removePasswordComponent();
                        // 跳转到支付结果页
                        nextPage(2);
                        // 设置支付结果页面数据
                      document.getElementById("payee_2").textContent = payObj.name;
                      document.getElementById("payMoneyTotal").textContent = payObj.money;
                    }
                    // 验证失败
                    else {
                        var erroMesg = document.getElementsByClassName("error")[0];
                        erroMesg.textContent = "您的密码输入错误";
                    }
                }
                // 累加1
                numkeyCount++;
            }
        }
        //删除密码点击事件
        var deleteKey=document.getElementsByClassName("deleteKey")[0];
        deleteKey.onclick =function () {
           //如果点击次数等于0时中断操作
            if(numkeyCount === 0) {
                return;
            }
            //删除密码数组中的最后一项
            numkeyCount--;
            //清除当前DIV内的I标签
            pwdValDiv[numkeyCount].innerHTML ="";
            //计数器减1
            currentPwd.pop();
            //如果密码为空的时候清空错误提示
            var erroMesg = document.getElementsByClassName("error")[0];
            erroMesg.textContent = "";
        };
        //关闭按钮
        var closePwdComponent =document.getElementsByClassName("closePwdComponent")[0];
        closePwdComponent.onclick =function () {
            //调用"移除密码组件"函数
            removePasswordComponent()
        }
    } // 支付按钮事件结束
    
}

/**
 * 功能：移除密码组件(必须在密码框出现之后调用)
 **/
function removePasswordComponent() {
    var componet = document.getElementsByTagName("component")[0];
    componet.style.zIndex = "-1";
    componet.innerHTML = "";
}









