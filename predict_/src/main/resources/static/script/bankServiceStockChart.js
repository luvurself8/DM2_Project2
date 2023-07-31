$(function(){
	
		am5.ready(function () {
	
			// Create root element
			var root = am5.Root.new("StockChart");
			
			
			// Set themes
			root.setThemes([
			    am5themes_Animated.new(root)
			]);
			
			
			// 차트 생성 
			var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
			}));
			
			
			// Set global number format
			root.numberFormatter.set("numberFormat", "#,###.00");
			
			
			
			// 메인 차트 
			var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
			    wheelY: "zoomX",
			    panX: true,
			    panY: true
			}));
			
			$.ajax({
				url : 'drawStockChart'
				, method : 'GET'
				, success : function(data){
					let time = {};
					
					
					for(i in data){
						const date = new Date(data[i]['datetime']);
						
						time.datetime = date.getTime();

						//time += {'datetime' : date.getTime()};
						//time += date.getTime();
						
						//Object.replace(data[i]['datetime'],Object.values(time));
						data[i]['datetime'] = time.datetime;
						}
							//console.log(Object.values(time));
							//console.log(Object.entries(time));
							console.log(data);
							
						// Y축 생성 
						var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
						    renderer: am5xy.AxisRendererY.new(root, {
						        pan: "zoom"
						    }),
						    extraMin: 0.1, // adds some space for for main series
						    tooltip: am5.Tooltip.new(root, {}),
						    numberFormat: "#,###.00",
						    extraTooltipPrecision: 2
						}));
						
						// X축 생성 
						var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
						    baseInterval: {
						        timeUnit: "day",
						        count: 1
						    },
						    renderer: am5xy.AxisRendererX.new(root, {}),
						    tooltip: am5.Tooltip.new(root, {})
						}));
						
						
						// 시리즈 생성 (메인차트에 생성)
						var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
						    name: "MSFT",
						    clustered: false,
						    valueXField: "datetime", //x값 
						    valueYField: "close_rate", //y값 
						    highValueYField: "high_rate", 
						    lowValueYField: "low_rate",
						    openValueYField: "open_rate",
						    calculateAggregates: true,
						    xAxis: dateAxis,  //x축
						    yAxis: valueAxis, //y축 
						    legendValueText: "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
						    legendRangeValueText: ""
						}));
						
						
						// 시리즈에 값 설정 
						stockChart.set("stockSeries", valueSeries);
						
						
						// Add a stock legend
						var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
						    stockChart: stockChart
						}));
						
						
						// Add cursor(s) : 차트에 커서를 갖다 댔을 때 해적선 생성 
						mainPanel.set("cursor", am5xy.XYCursor.new(root, {
						    yAxis: valueAxis,
						    xAxis: dateAxis,
						    snapToSeries: [valueSeries],
						    snapToSeriesBy: "y!"
						}));
						
						
						// 스크롤바 삽입 
						var scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
						    orientation: "horizontal",
						    height: 50
						}));
						
						//차트 위 도구 컨테이너 (스크롤바 생성)
						stockChart.toolsContainer.children.push(scrollbar);
						
						//Scrollbar X축 
						var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
						    baseInterval: {
						        timeUnit: "day",
						        count: 1
						    },
						    renderer: am5xy.AxisRendererX.new(root, {})
						}));
						
						//Scrollbar Y축 
						var sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
						    renderer: am5xy.AxisRendererY.new(root, {})
						}));
						
						//시리즈 스크롤바 
						var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
						    valueYField: "close_rate",
						    valueXField: "datetime",
						    xAxis: sbDateAxis,
						    yAxis: sbValueAxis
						}));
						
						sbSeries.fills.template.setAll({
						    visible: true,
						    fillOpacity: 0.3
						});
						
						// 사용자가 무언가를 선택하는 순간을 포착하기 위한 이벤트 
						var seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
						    stockChart: stockChart
						});
						
						seriesSwitcher.events.on("selected", function (ev) {
						    setSeriesType(ev.item.id);
						});
						
						function getNewSettings(series) {
						    var newSettings = [];
						    am5.array.each(["name", "valueYField", "highValueYField", "lowValueYField", "openValueYField", "calculateAggregates", "valueXField", "xAxis", "yAxis", "legendValueText", "stroke", "fill"], function (setting) {
						        newSettings[setting] = series.get(setting);
						    });
						    return newSettings;
						}
						
						function setSeriesType(seriesType) {
						    // Get current series and its settings
						    var currentSeries = stockChart.get("stockSeries");
						    var newSettings = getNewSettings(currentSeries);
						
						    // Remove previous series
						    var data = currentSeries.data.values;
						    mainPanel.series.removeValue(currentSeries);
						
						    // Create new series
						    var series;
						    switch (seriesType) {
						        case "line":
						            series = mainPanel.series.push(am5xy.LineSeries.new(root, newSettings));
						            break;
						        case "candlestick":
						        case "procandlestick":
						            newSettings.clustered = false;
						            series = mainPanel.series.push(am5xy.CandlestickSeries.new(root, newSettings));
						            if (seriesType == "procandlestick") {
						                series.columns.template.get("themeTags").push("pro");
						            }
						            break;
						        case "ohlc":
						            newSettings.clustered = false;
						            series = mainPanel.series.push(am5xy.OHLCSeries.new(root, newSettings));
						            break;
						    }
						
						    // Set new series as stockSeries
						    if (series) {
						        valueLegend.data.removeValue(currentSeries);
						        series.data.setAll(data);
						        stockChart.set("stockSeries", series);
						        var cursor = mainPanel.get("cursor");
						        if (cursor) {
						            cursor.set("snapToSeries", [series]);
						        }
						        valueLegend.data.insertIndex(0, series);
						    }
						}
						
						
						// Stock toolbar
						var toolbar = am5stock.StockToolbar.new(root, {
						    container: document.getElementById("chartcontrols"),
						    stockChart: stockChart,
						    controls: [
						        am5stock.IndicatorControl.new(root, {
						            stockChart: stockChart,
						            legend: valueLegend
						        }),
						        am5stock.DateRangeSelector.new(root, {
						            stockChart: stockChart
						        }),
						        am5stock.PeriodSelector.new(root, {
						            stockChart: stockChart
						        }),
						        seriesSwitcher,
						        am5stock.DrawingControl.new(root, {
						            stockChart: stockChart
						        }),
						        am5stock.ResetControl.new(root, {
						            stockChart: stockChart
						        }),
						        am5stock.SettingsControl.new(root, {
						            stockChart: stockChart
						        })
						    ]
						})
						
						
						var tooltip = am5.Tooltip.new(root, {
						    getStrokeFromSprite: false,
						    getFillFromSprite: false
						});
						
						tooltip.get("background").setAll({
						    strokeOpacity: 1,
						    stroke: am5.color(0x000000),
						    fillOpacity: 1,
						    fill: am5.color(0xffffff)
						});
						
						
						function makeEvent(date, letter, color, description) {
						    var dataItem = dateAxis.createAxisRange(dateAxis.makeDataItem({ value: date }))
						    var grid = dataItem.get("grid");
						    if (grid) {
						        grid.setAll({ visible: true, strokeOpacity: 0.2, strokeDasharray: [3, 3] })
						    }
						
						    var bullet = am5.Container.new(root, {
						        dy: -100
						    });
						
						    var circle = bullet.children.push(am5.Circle.new(root, {
						        radius: 10,
						        stroke: color,
						        fill: am5.color(0xffffff),
						        tooltipText: description,
						        tooltip: tooltip,
						        tooltipY: 0
						    }));
						
						    var label = bullet.children.push(am5.Label.new(root, {
						        text: letter,
						        centerX: am5.p50,
						        centerY: am5.p50
						    }));
						
						    dataItem.set("bullet", am5xy.AxisBullet.new(root, {
						        location: 0,
						        stacked: true,
						        sprite: bullet
						    }));
						}
						
						makeEvent(1619006400000, "S", am5.color(0xff0000), "Split 4:1")
						makeEvent(1619006400000, "D", am5.color(0x00FF00), "Dividends paid")
						makeEvent(1634212800000, "D", am5.color(0x00FF00), "Dividends paid")
						
						
						// set data to all series
						valueSeries.data.setAll(data);
						sbSeries.data.setAll(data);
					
					}// ajax function 끝 
					
			}); //ajax 끝
					
					}); //am.ready 끝 
	
})// 제일 끝 