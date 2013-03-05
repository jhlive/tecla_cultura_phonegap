var map;
var markers;
var map_initialized = false;
function center_map(map){
	var bounds = new google.maps.LatLngBounds();
}


function initialize_map(data){
	map = new GMaps({
			div: '#map',
			lat: 13.67527,
			lng: -89.28572
		});
	markers = data; 
	$.each(data,function(key,value){
		map.addMarker({
		lat: value.lat,
		lng: value.lng,
		title: value.name,
		infoWindow: {
				content: '<div class = "map-popup"><header><img src = "'+value.thumb+'"/><h4>'+value.name+'</h4></header><p>'+value.description+'</p></div>'
		}
		});
	});
	map.resize
}

function bind_handlers(){
	$(".attend-btn").live("click",function(){
		console.log("Attending event....")
		var event_id = $(this).data("event");
		$.post("/mobile_app/event/"+event_id+"/attend.json", function(data) {
			console.log(data);
			if(data.attended){
				$.mobile.changePage( "/", { transition: "slideup",reverse: true} );
			}
			else{
				if(!data.logged){
					window.location.replace("/auth/facebook");
				}
				else{
					$.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, "Error en conexion con Facebook", true );
					setTimeout( $.mobile.hidePageLoadingMsg, 1500 );
				}

			}
		});
		return false
	})

	$("#prev-month").live("click",function(){
		month= $(this).data("month")
		route = $(this).attr("href") + "&month=" + month 
		$.get(route,function(data){
			try{
				//$(".week-rows").hide();
				$(".week-rows").html(data);//.trigger("create");
				//$(".week-rows").show();
				prev_month = $("#prev-month-hidden").val();
				$("#prev-month").data("month", prev_month);
				next_month = $("#next-month-hidden").val();
				$("#next-month").data("month", next_month);
				$("#month").text($("#label-month-hidden").val())
			}
			catch(err){
				console.log(err)
			}
		})
		return false
	});

	$("#next-month").live("click",function(){
		month= $(this).data("month")
		route = $(this).attr("href") + "&month=" + month  
		$.get(route,function(data){
			try{
				//$(".week-rows").hide();
				$(".week-rows").html(data);//.trigger("create");
				//$(".week-rows").show();
				prev_month = $("#prev-month-hidden").val();
				$("#prev-month").data("month", prev_month);
				next_month = $("#next-month-hidden").val();
				$("#next-month").data("month", next_month);
				$("#month").text($("#label-month-hidden").val())

			}
			catch(err){
				console.log(err)
			}
		})
		return false
	});
	$('.gallery-page').live('pageshow', function(e){
		$("#gallery a").photoSwipe({});				
		return true;
	});

	$("#map-page").live("pageshow", function(){
		$.getJSON("/mobile_app/map.json", function(data){
			if(!map_initialized){
				initialize_map(data)
				map_initialized = true
			}
			
		})
		return true;
	})
	
}
$(document).on("ready", bind_handlers)