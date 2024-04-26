$(document).ready(function(){
    $("#characterNameCombo").change(function(){
        var selectedValue = $(this).val();
        $("#characterName").val(selectedValue);
        $("form").submit();
    });
});
