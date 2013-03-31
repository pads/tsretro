var $tileWrapper = $("<div class='tile wide text'>" +
                        "<div class='top-right icon-cancel'></div>" +
                        "<div class='text-header'></div>" +
                        "<br>" +
                        "<div class='text4'></div>" +
                    "</div");

function reset($form) {

    $form.find("input[type=text], textarea").val("");
}

function validateForm() {

    var title = $("#title").val();
    var notes = $("#notes").val();
    if (title && notes) {
        return true;
    } else {
        return false;
    }
}

function createNewNote() {

    var $newNoteTile = $tileWrapper.clone(true);
    $newNoteTile.find(".text-header").text($("#title").val());
    $newNoteTile.find(".text4").text($("#notes").val());

    return $newNoteTile;
}

function determineSectionAndAppendNoteTo($newNoteTile) {

    switch (parseInt($("#question").val(), 10)) {
    case 1:
        $newNoteTile.addClass("bg-color-purple");
        $("#well").append($newNoteTile);
        break;
    case 2:
        $newNoteTile.addClass("bg-color-green");
        $("#learn").append($newNoteTile);
        break;
    case 3:
        $newNoteTile.addClass("bg-color-blue");
        $("#different").append($newNoteTile);
        break;
    case 4:
        $newNoteTile.addClass("bg-color-orange");
        $("#puzzles").append($newNoteTile);
        break;
    }
}

(function($) {

    var $form = $("#note");

    $tileWrapper.on("mouseover", function () {

        $(this).find(".icon-cancel").show();
    }).on("mouseout", function () {

        $(this).find(".icon-cancel").hide();
    });

    $tileWrapper.on("click", ".icon-cancel", function () {

        $(this).parent().remove();
    });

    $("#new-btn").on("click", function () {

        $form.show();
    });

    $("#save-btn").on("click", function () {

        if(!validateForm()) { return; }

        var $newNoteTile = createNewNote();

        determineSectionAndAppendNoteTo($newNoteTile);

        $form.hide();
        reset($form);
    });

    $("#cancel-btn").on("click", function () {

        $form.hide();
        reset($form);
    });
}(jQuery));