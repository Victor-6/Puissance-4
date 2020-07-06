class PUISSANCE4 {

    constructor(selector, x, y, p1, p2) {
        if (x < 6) {
            x = 6;
        }
        if (y < 7) {
            y = 7;
        }
        this.row = x;
        this.column = y;
        this.player = p1;
        this.player1 = p1;
        this.player2 = p2;
        this.selector = selector;
        this.gameover = false;
        this.joueur_joue = function () {
        };
        this.grille();
        this.ajoutevenement();
        this.audio();
    }

    audio() {
        const playButton = document.querySelector("#jouer");
        const stopButton = document.querySelector("#restart");
        const monAudio = document.querySelector("audio");

        playButton.addEventListener("click", function () {
            monAudio.play();

            stopButton.addEventListener("click", function () {
                monAudio.pause();
            })
        })
    }

    grille() {
        const $array = $(this.selector); //const = variable dans une classe
        $array.empty();
        this.gameover = false;
        // this.player = 'red';
        this.player = this.player1;
        for (let x = 0; x < this.row; x++) {  //decalaration des coordonnées de x
            const $x = $('<div>')
                .addClass('x'); // ajouter une class

            for (let y = 0; y < this.column; y++) {  // decalaration des coordonnées de y
                const $y = $('<div>')
                    .addClass('y empty')
                    .attr('data-y', y)
                    .attr('data-x', x);
                $x.append($y);
            }
            $array.append($x);
        }
    }

    ajoutevenement() { //définit une fonction qui sera appelée chaque fois que l'événement spécifié est remis à la cible
        const $array = $(this.selector);
        const object = this; // sera la dernier object instensié

        function trouver_derniere_cellule(y) {
            const cells = $(`.y[data-y ='${y}']`);
            for (let i = cells.length - 1; i >= 0; i--) {
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) { //vérifier si un élément est dans la classe
                    return $cell;
                }
            }
            return null;
        }

        $array.on('mouseenter', '.y.empty', function () { //affiche une couleur sur la case si le curseur enttre dans la case
            if (object.gameover) return;
            const y = $(this).data('y');
            const $derniere_cellule = trouver_derniere_cellule(y);
            $derniere_cellule.addClass(`next-${object.player}`);
        });

        $array.on('mouseleave', '.y', function () { //enleve la couleur sur la cas si le curseur quitte la cible
            $('.y').removeClass(`next-${object.player}`);
        });

        $array.on('click', '.y.empty', function () {    //ajoute un pion dans la case au click
            if (object.gameover) return;
            const y = $(this).data('y'); //const x = $(this).data('x');
            const $derniere_cellule = trouver_derniere_cellule(y);
            $derniere_cellule.addClass(object.player);
            // .removeClass(`empty next-${object.player}`).data('player', `${object.player}`);
            $derniere_cellule.removeClass(`empty next-${object.player}`);
            $derniere_cellule.data('player', object.player);

            const gagnant = object.check_gagnant(
                $derniere_cellule.data('x'),
                $derniere_cellule.data('y')); // appelle la fonction qui affiche les gagnants

            if (gagnant) {
                alert(`Tu as gagné ! le joueur ${object.player} a gagné le titre d'hokage!`);

                if (object.player === object.player1) {
                    $("#playerOne").html(parseInt($("#playerOne").html(), 10) + 1);
                } else {
                    $("#playerTwo").html(parseInt($("#playerTwo").html(), 10) + 1);
                }

                $('.y.empty').removeClass('empty');
                return;

            }
            object.player = (object.player === object.player1) ? object.player2 : object.player1;
            object.joueur_joue();
            $(this).trigger('mouseenter');
        });
    }

    check_gagnant(x, y) {
        const object = this;

        function $getCellule(i, j) {
            return $(`.y[data-x = '${i}'][data-y = '${j}']`);
        }

        function checkdirection(direction) { // calcul du score par direction de ligne et de colonnes
            let total = 0;
            let i = x + direction.i;
            let j = y + direction.j;
            let $next = $getCellule(i, j);
            while (i >= 0 &&
            i < object.row &&
            j >= 0 &&
            j < object.column &&
            $next.data('player') === object.player) {
                total++;
                i += direction.i;
                j += direction.j;
                $next = $getCellule(i, j);
            }
            return total;
        }

        function checkwin(directionA, directionB) {
            const total = 1 +
                checkdirection(directionA) +
                checkdirection(directionB); // initialisation du score de 4 points
            if (total >= 4) {
                return object.player;
            } else {
                return null;
            }
        }

        function checkDiagonalBLtoTR() {
            return checkwin({i: 1, j: -1}, {i: 1, j: 1});
        }

        function checkDiagonalTLtoBR() {
            return checkwin({i: 1, j: 1}, {i: -1, j: -1});
        }

        function checkVerticals() {
            return checkwin({i: -1, j: 0}, {i: 1, j: 0});
        }

        function checkHorizontals() {
            return checkwin({i: 0, j: -1}, {i: 0, j: 1});
        }

        return checkVerticals() ||
            checkHorizontals() ||
            checkDiagonalBLtoTR() ||
            checkDiagonalTLtoBR();
    }

    restart() {
        this.grille();
        this.joueur_joue();
    }
}







