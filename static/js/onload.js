
const maildomain_list   = [ "@yahoo.co.jp",
                            "@gmail.com",
                            "@ezweb.ne.jp",
                            "@au.com",
                            "@docomo.ne.jp",
                            "@i.softbank.jp",
                            "@softbank.ne.jp",
                            "@excite.co.jp",
                            "@googlemail.com",
                            "@hotmail.co.jp",
                            "@hotmail.com",
                            "@icloud.com",
                            "@live.jp",
                            "@me.com",
                            "@mineo.jp",
                            "@nifty.com",
                            "@outlook.com",
                            "@outlook.jp",
                            "@yahoo.ne.jp",
                            "@ybb.ne.jp",
                            "@ymobile.ne.jp"
                            ]


//ブラウザのページロード時に実行する関数
//TIPS:類似に window.onload = function() {} があるが、これは複数定義すると先に定義したものが機能しなくなるため原則使用厳禁。
window.addEventListener("load" , function (){


    //フォームのリセット
    //TIPS:jQueryの.val()メソッドを使用することでフォームのvalue属性の値を入手したり、値を格納することができる
    $("#contact_name1").val("");
    $("#contact_name2").val("");
    $("#contact_cate").val("");
    $("#contact_mail").val("");
    $("#contact_main").val("");

});

//イベントリスナーの定義(jQuery)
$(function (){


    /* TIPS 
     * $( 【要素】 ).on("click",function(){ 【実行したい関数】 }); 
     * 【要素】がクリックされた時、【実行したい関数】が実行される
     */

    //ポートフォリオがクリックされた時、モーダルダイアログを表示させる
    $(".skill_col").on("click",function(){
        //TIPS:.show()で要素を表示、.hide()で要素を非表示にすることができる
        modal_open(this);
    });

 
    //モーダルダイアログの範囲外をクリックすると、モーダルダイアログを非表示にさせる
    $("#modal").on('click', function(event) {

        //モーダルダイアログの本体(#modal_content)以外をクリックした時
        if( !($(event.target).closest("#modal_content").length) ){
            $("#modal").hide();
        }
    }); 


    //フォームのメールアドレスに入力された時、フォームの内容をチェックする
    $("#contact_mail").on("keyup", function(){

        var mailaddress = $(this).val();

        mail_check(mailaddress);
    });

    //フォームを送信する
    //送信ボタン(#contact_submit)がクリックされた時、form_send()を実行する
    $("#contact_submit").on("click", function(){
        form_send();
    });


    
});

//関数の定義

function modal_open( elem ){

    
    //スキルごとにレベルと使用頻度を定義する連想配列
    var level_list  = { "html5":"5",
                        "js":"4",
                        "css3":"5",
                        "python":"4"
                        };
    var usage_list  = { "html5":"5",
                        "js":"5",
                        "css3":"3",
                        "python":"5",
                        };


    //アイコンのファイル名(拡張子なし)を抜き取る
    var icon_src    = $(elem).children("img").prop("src");
    var skill_name  = icon_src.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];

    //大文字化
    var title       = skill_name.toUpperCase();



    //モーダルの要素(タイトル、アイコンのパス、レベル、使用頻度)を書き換え
    $("#skill_title").html(title);
    $("#skill_icon").prop("src",icon_src);

    $("#skill_level").html(level_list[skill_name]);
    $("#skill_usage").html(usage_list[skill_name]);


    $("#modal").show();

}



function form_send(){

    //TODO:ここにメールアドレスが有効無効をチェック、無効であれば下記のアラートを表示させない
    alert("フォームを送信しました");
}

//メールアドレスのドメインチェックの関数
function mail_check(mailaddress){

    var valid_flag  = false;

    //for( 初期値 ; 終わる条件 ; 加算値 ){ 実行内容 }
    for(let i=0 ; i < maildomain_list.length  ; i++){
        //console.log(maildomain_list[i]);

        if ( mailaddress.indexOf(maildomain_list[i]) != -1 ) {
            valid_flag  = true;
        }
    }

    if (valid_flag){
        console.log("メールアドレスは有効です");
        $("#mail_valid").show();
        $("#mail_invalid").hide();
    }
    else{
        console.log("メールアドレスは無効です");
        $("#mail_valid").hide();
        $("#mail_invalid").show();
    }
}

