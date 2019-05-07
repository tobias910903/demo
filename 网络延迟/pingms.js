"use strict"

// 请求超时
function timeOut(){
    let img = document.querySelector("#img_error"); 
    let callback = img.onerror;
    img.onerror = null;
    img.src = "";
    nextTick(callback);
}

// 请求图片
function loadImg(src, callback) {
    let img = document.querySelector("#img_error"); 

    try {
        clearTimeout(timeOutID);
    }catch(err) {
        ;
    }

    img.src = src + Math.random();

    img.onerror = callback;
    timeOutID = setTimeout(timeOut, 6000);
}


// 定时请求
function startTest(){
    setTimeout(function(){
        if(tasks.count > 0) { 
            const now = new Date().getTime();
            const delay = now - startTime - tasks.reqTime;
            tasks.min = delay;
            document.querySelector("#result").textContent = (tasks.min) + "ms";
        }

        tasks.count++;
        startTime = new Date().getTime();
        loadImg(tasks.url, startTest);
    },tasks.reqTime);
}



/* 滴~ 滴滴~~ */
let nextTick = window.requestAnimationFrame || window.setTimeout
let tasks = {};
let startTime = 0;
let timeOutID = null;

function main() {

    tasks = {
        url: "http://127.0.0.1:666/",  // URL
        min: 60000,  // Min of several HTTP pings
        count: 0,   // 请求的次数 || 第一次无法计算值
        reqTime: 1000 // 每次请求的时间
    }

    // Start Test 
    startTest();
}

