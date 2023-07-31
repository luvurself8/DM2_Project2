/**
 * 환율조회
 */

$(function(){
   
    $('.bank_trans_input').on('keyup', outputExchange);
    
    //차트 클릭& 출력
    $('.bank_btn').on('click', drawchart);

})



function outputExchange(chartname) {
   
   //alert('넣었지?');
   
   //alert("이거이거"+chartname);
   let money = $('.bank_trans_input').val();
   let output = $('.exchange_rate_mostrecent');
   let cal = $('.bank_trans_output');
   let result = '';
   
   
   
   $.ajax({
      url : 'selectExchange',
      method : 'GET',
      data : {'chartname' : chartname},
      success : function(resp){

      
         switch(chartname){
         case 'USD': result = resp.usd;break;
         case 'CNY': result = resp.cny;break;
         case 'JPY': result = resp.jpy;break;
         case 'EUR': result = resp.euro;break;
         
         }
         //alert(result);
         
         
         output.val(result);
         cal.val((money/result).toFixed(2));
         //$('.bank_trans_input').select();
         //$('.bank_trans_input').focuse();
         
      }
   })
   
   
}


function drawchart() {
   //alert("클릭");
   $('#chartdiv').html('');
   
   let money = $('.bank_trans_input').val();
   
   if(money.length == 0){
      alert("금액을 먼저 입력해주세요");
      return;
   }
   let chartname = $(this).val();
   
   
   //버튼 클릭과 동시에 그 버튼에 맞는 환율 가져오기 
   $('.bank_trans_input').on('keyup', outputExchange(chartname));
   
   
   //alert(chartname);
   
   
   
   am5.ready(function () {
        
        
        function maybeDisposeRoot(divId) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id == divId) {
      root.dispose();
    }
  });
};

      //중앙 개체 생성 
      maybeDisposeRoot("chartdiv");
        var root = am5.Root.new("chartdiv");

        //테마 설정
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        
       

        root.dateFormatter.setAll({
                dateFormat: "HH:mm:ss",
                dateFields: ["valueX"],
                
            });
            
 

        //차트 생성 
        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
            width : am5.percent(100),
            height : am5.percent(100),
            layout : root.verticalLayout,
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.verticalLayout,
                pinchZoomX: true
            })
        );
        
        
         

        //차트위에 커서가 올라갔을 때  
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);
        
        

      //데이터 가져오기 
      $.ajax({
           url : 'drawChart'
           , method : 'GET'
           , data : {'chartname': chartname}
           ,success : function(data){
              
       
        
      //x축 선 설정 
        var xRenderer = am5xy.AxisRendererX.new(root, {});
        xRenderer.grid.template.set("location", 0.5);
        xRenderer.labels.template.setAll({
         minGridDistance: 50,
            location: 0.5,
            multiLocation: 0.5
        });

      //X축 생성 
        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.5,
                categoryField: "rate_time",
                baseInterval: { timeUnit: "day", count: 1 },
                renderer: xRenderer,
                
                tooltip: am5.Tooltip.new(root, {})
            })
        );
        
        xRenderer.labels.template.setAll({
           oversizedBehavior: "wrap",
           textAlign: "center"
      });
      
      xRenderer.labels.template.adapters.add("width", function(width, target) {
           var x0 = xAxis.getDataItemCoordinateY(xAxis.dataItems[0], "category", 0);
            var x1 = xAxis.getDataItemCoordinateY(xAxis.dataItems[0], "category", 1);
            target.set("maxWidth", x1 - x0)
           return x1 - x0;
         });
      //x축에 데이터 넣기 
        xAxis.data.setAll(data);
        
        
        //xAxis.events.once("datavalidated", function(ev) {
          // ev.target.zoomToIndexes(-1, 5);
         //});

      //Y축 생성 
        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxPrecision: 0,
                renderer: am5xy.AxisRendererY.new(root, {
                    inversed: true
                })
            })
        );

        //시리즈 만드는 함수 
        function createSeries(name, field) {


            var series = chart.series.push(
                am5xy.LineSeries.new(root, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: field,
                    categoryXField: "rate_time",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
                    })
                })
            );



            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        radius: 5,
                        fill: series.get("fill")
                    })
                });
            });

            
            series.set("setStateOnChildren", true);
            series.states.create("hover", {});

            series.mainContainer.set("setStateOnChildren", true);
            series.mainContainer.states.create("hover", {});

            series.strokes.template.states.create("hover", {
                strokeWidth: 4
            });

         //시리즈에 데이터 넣기 & 띄우기 
            series.data.setAll(data);
            series.appear(1000);
        }
        
        

      // 함수를 사용하여 시리즈 생성 
      
      switch(chartname){
         case 'USD': createSeries("Usd", "usd"); break;
         case 'CNY': createSeries("Cny", "cny");break;
         case 'JPY': createSeries("Jpy", "jpy");break;
         case 'EUR': createSeries("Euro", "euro");break;
      }
        
        
        

       //스크롤 애니메이션 
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal",
            marginBottom: 20
        }));


        var legend = chart.children.push(
            am5.Legend.new(root, {
                //centerX: am5.p50,
                //x: am5.p50
               centerX: am5.percent(50),
           x: am5.percent(50),
           layout: root.horizontalLayout,
           reverseChildren: true
            })
        );



        
        legend.itemContainers.template.states.create("hover", {});

        legend.itemContainers.template.events.on("pointerover", function (e) {
            e.target.dataItem.dataContext.hover();
        });
        legend.itemContainers.template.events.on("pointerout", function (e) {
            e.target.dataItem.dataContext.unhover();
        });

        legend.data.setAll(chart.series.values);
        
        

      xAxis.events.once("datavalidated", function(ev) {
        ev.target.zoomToIndexes(0, 5);
      });

        //애니메이션 실현 
        chart.appear(1000, 100);
    }
});
});
   
}