window.addEventListener("load" , function (){

    //ここにアニメーションを発動させたい要素に、アニメーション発動前の装飾を施す
    //例)   右から左に移動させたい場合、予めmargin-left:3rem、もしくはleft:3remなどを指定しておく

    $("#aboutme").css({"opacity":"0"});

    $("#skill_row").css({   "position"  : "relative",
                            "left"      : "-2rem",
                            "opacity"   : "0",
                        });

    //$(".article_frame").css({"opacity":"0"});
    
});

$(function() {

    //ここにスクロールで表示された時に実行するアニメーションを定義する
    $("#aboutme").on("inview",function() {
        //$(要素).animate({CSSの装飾},ミリ秒);
        $(this).animate( {"opacity":"1"} ,1000);
    });

    $("#skill_row").on("inview",function() {
        $(this).animate( {  "left"      : "0",
                            "opacity"   : "1",
                            } ,1200);
    });

    
    //TIPS:クラスで指定するときはthisを使用する
    //TIPS:第二引数にonInviewを指定することで、要素が画面外になった時、装飾を指定することができる。
    //画面外になった時に装飾を元に戻すことで、要素が画面内に入るたびにアニメーションを表現することができる
    /*
    $(".article_frame").on("inview",function(event,visible){

        //要素が画面内に入った時に発動
        if (visible){
            $(this).animate({"opacity":"1"},1000);
        }
        //要素が画面外になった時に発動
        else{
            $(this).css({"opacity":"0"});
        }
    });
    */


    /* 【注意1】animateメソッドは数値型の値にしか対応していない(例えば、opacity:0.1、width:50%、top:10rem等)
     *          そのため、trasform:scale(1.2,1.2)、 display:block、background:deepskyblueなどをanimateで指定しても動いてくれない。
     *          対策としてjQuery.colorもしくはjQuery.UIを使用してアニメーションを表現する。*/
    /* 【注意2】JavaScript(jQuery)では疑似要素(beforeとafter)を指定して装飾を施すことはできない。
     *          そのため、CSS3のアニメーションとJSのアニメーションを共存させる場合、なるべくCSS3側で疑似要素を使用しないように作る必要がある。
     *          しかし、疑似要素を使うことで、HTMLの構造を簡略化することができるため、JSアニメーションを使用する予定がない場合は疑似要素でOK。
     */

    //アニメーションの発動場所を要素の末端であるarticle_bottomとする
    $(".article_bottom").on("inview",function(event,visible){

        //スマホビューのときだけ発動する。PCビューのときはreturn falseで発動させない
        var width   = $(window).width();
        if (width >= 768){
            return false;
        }

        //一旦、親要素のフレーム部分を抜き取る
        var article_frame       = $(this).closest(".article_frame");

        //フレーム部分の中にある、アニメーション実行時に装飾を変異させる要素を抜き取る
        var title_before        = $(article_frame).find(".title_before");
        var continue_before     = $(article_frame).find(".continue_before");
        var article_title       = $(article_frame).find(".article_title");
        var article_continue    = $(article_frame).find(".article_continue");
        
        var article_thumb       = $(article_frame).find(".article_thumb");
        var article_thumb_frame = $(article_frame).find(".article_thumb_frame");


        //要素が画面内に入った時に発動
        if (visible){
            $(article_title).css({"color":"white"});
            $(article_continue).css({"color":"white","font-weight":"bold"});

            //注:animateメソッドを使用しなくても、指定の要素は既にtransitionが付いているので、cssメソッドで指定してもアニメーションが発生する
            $(title_before).animate({"width":"100%"},200);
            $(continue_before).animate({"width":"100%"},200);

            $(article_thumb).css({"transform":"scale(1.2,1.2)"});
            $(article_thumb_frame).css({"border":"solid 0.25rem deepskyblue"});

        }
        //要素が画面外になった時に発動
        else{
            $(article_title).css({"color":"#a9a9b3"});
            $(article_continue).css({"color":"#a9a9b3"});

            $(title_before).animate({"width":"0%"},200);
            $(continue_before).animate({"width":"0%","font-weight":""},200);

            $(article_thumb).css({"transform":"scale(1,1)"});
            $(article_thumb_frame).css({"border":"solid 0.25rem transparent"});
        }


    })


});

