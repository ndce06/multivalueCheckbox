(function($){
  $.fn.multivalueCheckbox = function(options) {		
		var defaults = {
			targetAtt: 		'value',				//Target attribute of checkbox
			AttrArray: [
				{'valAttr': 1, 'imgSrc': 'check.gif', 'imgTitle': ''},
				{'valAttr': 0, 'imgSrc': 'uncheck.gif', 'imgTitle': ''}
			],
			imgCss: 		{
								'width':'16px',
								'height':'16px',
								'cursor':'pointer'
							}, 						// Image css
			selectedValue: 	'', 					// 	selected value
			imgClick: 		function(oImg,newVal){} 	// Function triggers on image click -- oImg: image object and newVal: new value
	    };
	    var options = $.extend(true,defaults, options);
		//Remove img
		jQuery('img.multivalueCheckbox_image').remove();
		return this.each(function() {
			var objCheck = jQuery(this);
			var selectedIndx = 0;
			var selectedValue = (options.selectedValue == '') ? objCheck.attr(options.targetAtt) : options.selectedValue; 
			for(var j=0; j<options.AttrArray.length; j++) {
				if (options.AttrArray[j].valAttr == selectedValue) {
					selectedIndx = j;
					break;
				}
			} 
			
			var currentVal = options.AttrArray[selectedIndx].valAttr;
			var currentSrc = options.AttrArray[selectedIndx].imgSrc;
			var currentTitle = options.AttrArray[selectedIndx].imgTitle;
			 
			objCheck.hide().attr('checked',true).attr(options.targetAtt,currentVal);
			
			var img = document.createElement('img');
      		img.className = "multivalueCheckbox_image";
			img.src = currentSrc;
			
			jQuery(objCheck).attr("id", "input_image_" + selectedIndx);
      		jQuery(img).attr("id", "image_" + selectedIndx).css(options.imgCss).attr('title',currentTitle);
			jQuery(img).click(function(){
				var imgId = jQuery(this).attr("id");
				var i = imgId.split('_')[1];
				i++; 
				if(i >= options.AttrArray.length)
					i = 0;
				
				var cTitle = options.AttrArray[i].imgTitle;	
				jQuery(objCheck).hide().attr('checked',true).attr('id','input_image_' + i).attr(options.targetAtt,options.AttrArray[i].valAttr);
				jQuery(this).attr('id',"image_" + i).attr('src',options.AttrArray[i].imgSrc).attr('title',cTitle);
				
				options.imgClick(jQuery(this),options.AttrArray[i].valAttr);
			});
			
			jQuery(objCheck).before(img);
		});
	};
})(jQuery);
