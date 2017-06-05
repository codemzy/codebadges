/* global jQuery */

(function(global, $) {
    
    // codeBadges function will return a codeBadges.init object with some default values
    var codeBadges = function(name) {
        return new codeBadges.init(name);
    };
    
    // Methods that can be used
    codeBadges.prototype = {
        
    };
    
    // codeBadges.init function constructor
    codeBadges.init = function(name) {
        var self = this;
        self.name = name || 'codemzy';
    };
    
    // codeBadges init prototype same as the codeBadges one (both point to the same prototype)
    codeBadges.init.prototype = codeBadges.prototype;
    
    // pass our codeBadges function to the global window object
    global.codeBadges = codeBadges;
    
})(window, jQuery);