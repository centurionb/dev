// Modified Isotope methods for gutters in masonry
$.Isotope.prototype._getMasonryGutterColumns = function() {
	var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
	containerWidth = this.element.width();
 
	this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
	// Or use the size of the first item
	this.$filteredAtoms.outerWidth(true) ||
	// If there's no items, use size of container
	containerWidth;
 
	this.masonry.columnWidth += gutter;
 
	this.masonry.cols = Math.floor((containerWidth + gutter) / this.masonry.columnWidth);
	this.masonry.cols = Math.max(this.masonry.cols, 1);
};
 
$.Isotope.prototype._masonryReset = function() {
	// Layout-specific props
	this.masonry = {};
	// FIXME shouldn't have to call this again
	this._getMasonryGutterColumns();
	var i = this.masonry.cols;
	this.masonry.colYs = [];
	while (i--) {
		this.masonry.colYs.push(0);
	}
};
 
$.Isotope.prototype._masonryResizeChanged = function() {
	var prevSegments = this.masonry.cols;
	// Update cols/rows
	this._getMasonryGutterColumns();
	// Return if updated cols/rows is not equal to previous
	return (this.masonry.cols !== prevSegments);
};


$.Isotope.prototype._getMasonryGutterColumns = function() {
    var gutter = this.options.masonry.gutterWidth || 0;
    containerWidth = this.element.parent().width();
    this.masonry.columnWidth = this.options && this.options.masonry.columnWidth ||
      this.$filteredAtoms.outerWidth(true) ||
      containerWidth;
    this.masonry.columnWidth += gutter;
    this.masonry.cols = Math.floor(containerWidth / this.masonry.columnWidth);
    this.masonry.cols = Math.max(this.masonry.cols, 1);
  };
 
  $.Isotope.prototype._masonryReset = function() {
    this.masonry = {};
    this._getMasonryGutterColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
      this.masonry.colYs.push( 0 );
    }
  };
 
  $.Isotope.prototype._masonryResizeChanged = function() {
    var prevColCount = this.masonry.cols;
    this._getMasonryGutterColumns();
    return ( this.masonry.cols !== prevColCount );
  };
 
  $.Isotope.prototype._masonryGetContainerSize = function() {
    var gutter = this.options.masonry.gutterWidth || 0;
    var unusedCols = 0,
      i = this.masonry.cols;
    while ( --i ) {
      if ( this.masonry.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    return {
      height : Math.max.apply( Math, this.masonry.colYs ),
      width : ((this.masonry.cols - unusedCols) * this.masonry.columnWidth) - gutter
    };
  };
