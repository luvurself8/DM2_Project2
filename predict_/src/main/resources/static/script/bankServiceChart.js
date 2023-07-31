/**
 * 
 
*/
$(function(){
		
});

function drawchart() {
	
	am5.ready(function () {
        //중앙 개체 생성 
        var root = am5.Root.new("chartdiv");

        //테마 설정
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        root.dateFormatter.setAll({
                dateFormat: "yyyy-MM-dd HH:mm:ss",
                dateFields: ["valueX"]
            });

        //차트 생성 
        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
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
			  ,success : function(data){
				  
        
        
		//x축 선 설정 
        var xRenderer = am5xy.AxisRendererX.new(root, {});
        xRenderer.grid.template.set("location", 0.5);
        xRenderer.labels.template.setAll({
            location: 0.5,
            multiLocation: 0.5
        });

		//X축 생성 
        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "rate_time",
                baseInterval: { timeUnit: "day", count: 1 },
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            })
        );
		
		//x축에 데이터 넣기 
        xAxis.data.setAll(data);
        
        

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
        createSeries("Usd", "usd");
        //createSeries("Euro", "euro");
        //createSeries("Jpy", "jpy");
        //createSeries("Cny", "cny");
        //createSeries("Dollar_index", "dollar_index");
        

 		//스크롤 애니메이션 
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal",
            marginBottom: 20
        }));


        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
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