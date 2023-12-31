
    // 修炼等级
    var culLevel=[
      "炼气期  一阶"
      ,"炼气期  二阶"
      ,"炼气期  三阶"
      ,"炼气期  四阶"
      ,"炼气期  五阶"
      ,"炼气期  六阶"
      ,"炼气期  七阶"
      ,"炼气期  八阶"
      ,"炼气期  九阶"
      ,"筑基期  初期"
      ,"筑基期  初期巅峰"
      ,"筑基期  中期"
      ,"筑基期  中期巅峰"
      ,"筑基期  后期"
      ,"筑基期  后期巅峰"
      ,"结丹期  初期"
      ,"结丹期  初期巅峰"
      ,"结丹期  中期"
      ,"结丹期  中期巅峰"
      ,"结丹期  后期"
      ,"结丹期  后期巅峰"
      ,"元婴期  初期"
      ,"元婴期  初期巅峰"
      ,"元婴期  中期"
      ,"元婴期  中期巅峰"
      ,"元婴期  后期"
      ,"元婴期  后期巅峰"
      ,"元婴期  半步化神"
      ,"飞升上界"
    ];
    var mood = [
      "走火入魔"
      ,"心魔侵扰"
      ,"惊涛骇浪"
      ,"道心不稳"
      ,"心烦意乱"
      ,"心如草木"
      ,"枯木逢春"
      ,"渐入佳境"
      ,"道心坚毅"
      ,"天人合一"
    ];
    var mindNum = Math.floor(Math.random() * 8) + 2;
    var level = 0;
    $(function(){
      $("#level").text(culLevel[level]);
      $("#mindVal").text(mood[mindNum]);  
    })
    
  
    // 计算屏幕中心点坐标
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    function init() {
      var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      // 计算星星的起始坐标
      var startX = Math.random() * window.innerWidth;
      var startY = Math.random() * window.innerHeight;
      
      var star = document.createElement('div');
      star.className = 'star';
      star.style.backgroundColor = color;
      star.style.left = startX + 'px';
      star.style.top = startY + 'px';
      document.getElementById('container').appendChild(star);

      // 计算星星移动到屏幕中央所需的距离
      var deltaX = centerX - startX;
      var deltaY = centerY - startY;

      function moveStar() {
        startX += deltaX * 0.01; // 移动的速度，这里是固定的，你可以根据需要进行调整
        startY += deltaY * 0.01;
        star.style.left = startX + 'px';
        star.style.top = startY + 'px';

        // 检查是否移动到屏幕中央
        if (Math.abs(startX - centerX) < 1 && Math.abs(startY - centerY) < 1) {
          star.style.animation = 'none'; // 停止动画
          star.parentNode.removeChild(star);
        } else {
          requestAnimationFrame(moveStar); // 继续移动
        }
      }

      moveStar(); // 启动星星移动
    }
    

    // 时间流逝
    setInterval(function(){
      var timeVal = parseInt($('#Timeval').text());
      $('#Timeval').text(++timeVal);

      mindNum = Math.floor(Math.random() * 8) + 2;
      $("#mindVal").text(mood[mindNum]);
    }, 5 * 60 * 1000);


    function staraction(){//信念汇聚
        var flowNum = parseInt($('#flowVal').text());
        $('#flowVal').text(flowNum+1);
        setTimeout(init, Math.random() * 5000);
    }
    function hurt(){//偷袭伤害
        isAnimating = true;    
        var expEffect = document.querySelector('.exp-effect');
        var $lefthurt = $('#lefthurt');
        var realVal = parseInt($('#realVal').text());
        expEffect.textContent = "-1";
        expEffect.style.color = 'green';
        var clone = expEffect.cloneNode(true);
        document.body.appendChild(clone);
        var initialTop = clone.offsetTop;
        clone.style.top = initialTop + 'px'; // 初始位置设为元素的当前位置
        clone.animate([
          { opacity: 1, top: initialTop + 'px' },
          { opacity: 0, top: (initialTop - 100) + 'px' }
        ], {
          duration: 1000,
          easing: 'ease-out'
        }).onfinish = function() {
          clone.remove();
          isAnimating = false;
        };

        
        $lefthurt.css('opacity', 1);
        $lefthurt.stop().animate({opacity: 0}, 1000, 'linear');
        
        if(realVal>0)
          $('#realVal').text(--realVal);
        if (Math.random() < 0.2)
        {
          --mindNum;
          $("#mindVal").text(mood[mindNum]);
        }
        audio = new Audio("./media/偷袭.wav");
        audio.play();  
    }
    function improve(){
        var realVal = parseInt($('#realVal').text());
        var flowNum = parseInt($('#flowVal').text());
        var targetVal = parseInt($('#targetVal').text());
        var growVal = (1+parseInt((level+1)/10)+Math.floor(Math.log(flowNum) / Math.log(100)))*(mindNum-4);
       
        isAnimating = true;    
        // 播放动画效果
        var expEffect = document.querySelector('.exp-effect');
        if(growVal>0){
          expEffect.textContent = "+"+growVal;
          expEffect.style.color = 'red';
        }else if(growVal<0){
          expEffect.textContent = growVal;
          expEffect.style.color = '#3c3c3c';
        }
        
        var clone = expEffect.cloneNode(true);
        document.body.appendChild(clone);
        var initialTop = clone.offsetTop;
        clone.style.top = initialTop + 'px'; // 初始位置设为元素的当前位置
        
        clone.animate([
          { opacity: 1, top: initialTop + 'px' },
          { opacity: 0, top: (initialTop - 100) + 'px' }
        ], {
          duration: 1000,
          easing: 'ease-out'
        }).onfinish = function() {
          clone.remove();
          isAnimating = false;
        };
        if(growVal+realVal >= 0)
          $('#realVal').text(growVal+realVal);
        if(growVal+realVal >= targetVal)
        {
          $("#level").text(culLevel[++level]);
          switch(level){
            case 9:
              $("#person").css("background-image", "url(./img/person2.png)");
              $("#bgpicture").css("background-image", "url(./img/workbg2.png)");
              audio = new Audio("./media/别来无恙.wav");
              audio.play();
              break;
            case 15:
              $("#person").css("background-image", "url(./img/person3.png)");
              $("#bgpicture").css("background-image", "url(./img/workbg3.png)");
              $("#headbg").css("background-image", "url(./img/headbg2.png)");
              audio = new Audio("./media/大道无情.wav");
              audio.play();
            break;
            case 21:
              $("#person").css("background-image", "url(./img/person4.png)");
              $("#bgpicture").css("background-image", "url(./img/workbg4.png)");
              break;
            case 28:
              $("#person").hide();
              $("#headbg").hide();
              $(".exp-effect").hide();
              $("#bgpicture").css("background-image", "url(./img/workbg5.png)");
              audio = new Audio("./media/飞升.wav");
              audio.play();  
            break;
            default:break;
          }
          $("#advance").text(culLevel[level]);
          $('#targetVal').text(targetVal*2);
          $('#realVal').text(0);
          $("#advance").stop().fadeTo(300, 1, function() {
            $(this).delay(1500).fadeTo(500, 0);
          });
        }
        audio = new Audio("./media/多谢.wav");
        if(Math.random() < 0.2)
          audio.play();    
      
    }
    $(document).on('keypress', function(event) {
      if(event.key == 'k'){
        staraction();
      }else if(event.key == 'l'){
        hurt();
      }else if(event.key == 'r'){
       improve();
      }
    });
    /**
     * 魔道入侵效果
     * */
    const reception = document.getElementById("reception");
    // 触发动画效果
    function triggerAnimation() {
      reception.style.display = "flex";
      reception.classList.remove("animationClass");
      void reception.offsetWidth; // 强制浏览器重新计算样式
      reception.classList.add("animationClass");
    }

 
   
