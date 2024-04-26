$(document).ready(function(){
    $("#characterNameCombo").change(function(){
        var selectedValue = $(this).val();
        var url = "/searchCharacter/" + selectedValue;
        window.location.href = url;
    });
});
