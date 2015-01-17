var i =  0;
(function($){
    $.fn.rotator = function(options){
         var percent = parseInt(this.data('percent'))
        var percent = 0 ;
  
        var settings = $.extend({
            starting: 0,
            ending: percent,
            percentage: true,
            color: '#FED136',
            lineWidth: 10,
            timer: 20,
            radius: 40,
            fontStyle: 'Calibri',
            fontSize: '18pt',
            fontColor: '#FED136',
            backgroundColor: 'lightgray',
            callback: function () {
            }
        }, options);
      
          this.empty().append("<canvas height ="+this.height() + " width="+this.width()+" class='progress-bar-canvas'></canvas>");
      
        $('.progress-bar-canvas').each(function() {
          var percent = 0;
          if(i==0)
            percent = 90;
          else if(i==1)
            percent = 75;
          else if(i==2)
            percent = 60 ;
          else if (i==3)
            percent = 80 ;
          else if(i==4)
            percent = 80 ;
          else
            percent = 60 ;
          settings.ending = percent;
          i++;
        //  alert(settings.percentage); 
          var x = this.width / 2;
          var y = this.height / 2;
          var radius = settings.radius;
          var context = this.getContext("2d");
          if(settings.backgroundColor){
              var ctx = this.getContext('2d');
              ctx.arc(x, y, radius, 0, 2*Math.PI, false);
              ctx.strokeStyle = settings.backgroundColor;
              ctx.lineWidth = settings.lineWidth;
              ctx.stroke()
          }
          
          var steps = settings.ending - settings.starting;
          var step = settings.starting;
          var z = setInterval(function(){
              var text;
              if(settings.percentage){text = step + "%"}else{text = step}
              var start_angle = (1.5 + (step/50))*Math.PI;
              var end_angle = (1.5 + (++step/50))*Math.PI;
              context.beginPath();
              context.arc(x, y, radius, start_angle, end_angle, false);
              context.lineWidth = settings.lineWidth;
              context.strokeStyle = settings.color;
              context.stroke();
              context.font = settings.fontSize + ' ' + settings.fontStyle;
              context.textAlign = 'center';
              context.textBaseline = 'middle';
              context.fillStyle = settings.fontColor;
              context.clearRect(x - parseInt(settings.fontSize)*1.5, y - parseInt(settings.fontSize)/2, parseInt(settings.fontSize)*3, parseInt(settings.fontSize));
              if(step >= steps){
                  window.clearInterval(z);
                  if(settings.percentage){text = step + "%"}else{text = step}
                  context.clearRect(x - parseInt(settings.fontSize)*1.5, y - parseInt(settings.fontSize)/2, parseInt(settings.fontSize)*3, parseInt(settings.fontSize));
                  if(typeof(settings.callback) == 'function'){
                      settings.callback.call(this);
                  }
              }
          }, settings.timer)
      });
    }
}(jQuery));

// $(document).ready(function(){
// 	$('#rotator').rotator({
// 		starting: 0,
// 		ending: 100,
// 		lineWidth: 10
// 	})
// })