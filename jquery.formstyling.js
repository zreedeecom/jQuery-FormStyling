/***************************************************
* This a simple plugin for jQuery that is still in *
* development, now it's buggy and dirty.           *
*                                                  *
* The plugin is intended to make those horrible    *
* <select> form elements look cleaner and put the  *
* ability to use css to style them without         *
* worrying about if javascript is disable on       *
* client, it will show your ugly <select> elements *
* like normal.                                     *
*                                                  *
*                                                  *
* Author: Luis Gimenez                             *
* Author URL: http://zreedee.com                   *
* Author E-mail: nitwit@zreedee.com                *
* Version: 1.0                                     *
*                                                  *
***************************************************/


(function($) {
	// Shell for your plugin code

	$.fn.formStyling = function() {			
		$('select', this).selectStyle();
		$('.select-wrapper', this).selectStyleActions();
	}// eof formStyling

	$.fn.selectStyle = function() {
		var select = this;
		
		//Hide the element
		select.hide();

		//Wrap the <select>
		select.wrap("<div class='select-wrapper'></div>");
		var selectWrapper = select.parent('.select-wrapper');
		
		//Add the label
		selectWrapper.append('<p class="select-label"></p>');
		var selectLabel = selectWrapper.find('.select-label');

		//Set New <select> label
		var theLabel = select.attr('title');
	  select.parent().find('.select-label').html(theLabel);

		//Add <ul> tags to the wrapper
		selectWrapper.append('<ul class="options"></ul>');
		var ul = $('ul', selectWrapper);

		//Add form <hidden> field based on current element
		var name = select.attr('name');
		select.parent('.select-wrapper').append('<input class="select-hidden" type="hidden" name="' + name + '" />');

		//Generate the options taken form the element
		$('option', select).each(function(i){
			var options = '<li><a href="#" index="'+ $(this).attr('value') +'">'+ $(this).html() +'</a></li>';
			ul.append(options);
		});

		//Check if a default <option> was set and apply the '.active' class to its parent
		var selectedOption = select.find('option:selected').val();
		$('a[index=' + selectedOption + ']', ul).parent('li').addClass('active');
		$(this).closest('.select-wrapper').find('.select-hidden').val(selectedOption);
			//After this add change the label
			//console.log(selectedOption);
			if(selectedOption != '0') {
				var labelText = select.find('option:selected').text();
				$(this).closest('.select-wrapper').find('.select-label').text(labelText);
			}
			
		//Remove the element from the DOM to avoid problems on submission
		select.remove();

		selectWrapper.append("<div class='extend'></div>");

	}; // eof selectStyle

	$.fn.selectStyleActions = function() {
	
		//Toggle options view
		var Labels = $('.select-label', this);
		//console.log(Labels);
		return this.each(function(){
		
			var ul = $(this).children('ul.options');
	    $(Labels, this).bind('click', function(){
				if( $('ul.options').hasClass('options-open') == true) {
					$('ul.options.options-open').slideUp(function(){
						$(this).parent().find('.extend').hide();
						$(this).removeClass('options-open');
					});
				}
				else{
					$(this).parent().find('.extend').show();
					ul.addClass('options-open').slideDown();
				}
	    }); //eof bind('click') for labels

		$('ul.options').find('a').click(function(){	
			$(this).closest('ul').find('li.active').removeClass('active');
			$(this).parent('li').addClass('active');
			
			var hiddenVal = $(this).attr('index');
			var newLabel  = $(this).text();
			var closestParent = $(this).closest('.select-wrapper');
			
			$('.select-label', closestParent).text(newLabel);
			closestParent.find('.select-hidden').val(hiddenVal);
			
			$('ul.options.options-open').slideUp(function(){
				$(this).removeClass('options-open');
				$(this).parent().find('.extend').hide();
			});			
			
			return false;
		});


		}); //eof each
		
	}; // eof selectStyleactions


})(jQuery);