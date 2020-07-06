(function ($) {
    $.fn.PUISSANCE4 = function () {

    }
}(jQuery));

$(document).ready(function () {
    $('#body').PUISSANCE4();
    let connectfour;
    $("#envoyez").click(function (e) { // masquer le formulaire
        e.preventDefault();
        $("#formulaire").hide();

        let c1 = $('#couleur1').val();
        let c2 = $('#couleur2').val();


        $("#span_un").html($("#joueur1").val());
        $("#span_un").css("color", c1);
        $("#span_deux").html($("#joueur2").val());
        $("#span_deux").css("color", c2);

        connectfour = new PUISSANCE4('#jeu',
            prompt("Nombre de lignes ?"),
            prompt("Nombre de colonnes ?"), c1, c2);
        $("#input").removeClass("hide");
    });

    $('#restart').click(function () {
        connectfour.restart();
    });

    $('#new').click(function () {
        location.reload();
    });
    $('#jeu').click(function () {

    });

    let play = document.querySelector('#audio');
});
