$(window).on("load", function () {
    if ($(window).width() < 768) {
        $('#logo-halfhalf').attr("src", "https://search-merchant.คนละครึ่ง.com/images/halfhalf-logo-mini.png");
        $('#navProvince').hide();
        $('#navFilterBtn').show();

        $('#navbar').addClass('container-fluid');
        $('#navbar').removeClass('container');

        $('#sidebar').hide();

    }
    else {
        $('#logo-halfhalf').attr("src", "https://search-merchant.คนละครึ่ง.com/images/halfhalf-logo.png");
        $('#navProvince').show();
        $('#navFilterBtn').hide();

        $('#navbar').addClass('container');
        $('#navbar').removeClass('container-fluid');

        $('#sidebar').show();


    }
});

$(window).on("resize", function () {

    if ($(window).width() < 768) {
        $('#logo-halfhalf').attr("src", "https://search-merchant.คนละครึ่ง.com/images/halfhalf-logo-mini.png");
        $('#navProvince').hide();
        $('#navFilterBtn').show();

        $('#navbar').addClass('container-fluid');
        $('#navbar').removeClass('container');

        $('#sidebar').hide();

    }
    else {
        // md-lg

        $('#logo-halfhalf').attr("src", "https://search-merchant.คนละครึ่ง.com/images/halfhalf-logo.png");
        $('#navProvince').show();
        $('#navFilterBtn').hide();

        $('#navbar').addClass('container');
        $('#navbar').removeClass('container-fluid');
        $('#sidebar').show();

    }
});

function toggleSidebar(){
    $('#sidebar').toggle();
}
