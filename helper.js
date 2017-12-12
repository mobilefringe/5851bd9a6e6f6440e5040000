function init() {
    $('<div class="loader_backdrop"><div class="loader">Loading...</div></div>').appendTo(document.body);
    
    $("#brand_select").on('change', function() {            
        if ($(this).val() != ""){
            window.location = "/stores/"+ $(this).val();    
        }
    });  
 
    var _fbq = window._fbq || (window._fbq = []);
        if (!_fbq.loaded) {
            var fbds = document.createElement('script');
            fbds.async = true;
            fbds.src = '//connect.facebook.net/en_US/fbds.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(fbds, s);
            _fbq.loaded = true;
          }
        _fbq.push(['addPixelId', '548352815262916']);
    window._fbq = window._fbq || [];
    window._fbq.push(['track', 'PixelInitialized', {}]);
    
    $(".long_feature_box").hover(function() {
        $(this).find(".long_feature_label").animate({
            "top": "-=81%"
        }, 500)
    }, function() {
        $(this).find(".long_feature_label").animate({
            "top": "+=81%"
        }, 500)
    });
    
    //Campaign Monitor Sign Up
    $('#subForm').submit(function (e) {
        if ($("#agree_terms").prop("checked") != true){
            alert("Please agree to the term and conditions.");
            $("#agree_terms").focus();
            return false;
        }
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    alert("Please try again later.");
                } else { // 200
                    $('#subForm').trigger('reset');
                    $("#success_subscribe").fadeIn();
                    
                }
        });
    });
    
    //dynamically changing copyright year
    var current_year = moment().year();
    $("#current_year").text(current_year);

    function submitToMailChimp(){
        $("#mce-EMAIL").val($('#fieldEmail').val())
        $.ajax({
            type: $("#mc-embedded-subscribe-form").attr('method'),
            url: $("#mc-embedded-subscribe-form").attr('action'),
            data: $("#mc-embedded-subscribe-form").serialize(),
            cache       : false,
            dataType    : 'json',
            contentType: "application/json; charset=utf-8",
            error       : function(err) { alert("Could not connect to the registration server. Please try again later.") },
            success     : function(data) {
           
                if (data.result != "success") {
                    $("#success_subscribe").fadeIn();
                } else {
                    $("#success_subscribe").fadeIn();
                }
            }
        })
    }
}

function show_content(){
    $(".yield").css({visibility: "visible"});
    $(".loader_backdrop").remove();
    
    var header_stores = getStoresList();
    renderStoreList('#brand_select','#brand_select_template', header_stores, "stores");
    $("#brand_select").prepend("<option selected>Brands</option>");
    
    renderHomeHours();
    
    var feature_items = getFeatureList();
    var one_item = feature_items.slice(0,1);
    renderFeatureItems('#feature_item','#feature_item_template', one_item);
    var two_items = feature_items.slice(1,3);
    renderFeatureItems('#home_feature','#home_feature_template', two_items);
}

function load_store_map(reg, store_details){
    this_region = {};
    this_region = store_details.svgmap_region;
    map = $('#mapsvg').mapSvg({
        source: getSVGMapURL(),    // Path to SVG map
        colors: {stroke: '#aaaaaa', selected: '#f57b2b', hover: "#f57b2b"},
        disableAll: true,
        // height: 450,
        // width: 690,
        regions: reg,
        tooltipsMode: 'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': true,'location': 'left' },
        pan: true,
        scroll: false,
        cursor:'move',
        responsive: true,
        zoomLimit: [0, 10],
    });
    map.selectRegion(store_details.svgmap_region);
}