var tvgla = {
	// Translate API link
	// [EDIT_YOURKEY]を自分の作成したキーに変更
	link : "//script.google.com/macros/s/[EDIT_YOURKEY]/exec",
	// 選択状態が安定するまでの待機時間
	waitStableTime : 500,
	// 文字変化確認用カウント
	c : 0,
	// 選択オブジェクト取得
	getSelectionObject : function(){
		return ((window.getSelection&&window.getSelection())
			||(document.getSelection&&document.getSelection())
			||(document.selection&&document.selection.createRange&&document.selection.createRange().text));
	},
	// 翻訳処理実行
	translateViaGLA : function(){
		var so=tvgla.getSelectionObject();
		if(so.type == "Caret" || so.toString().length == 0){
			tvgla.c = 0;
			return;
		}
		tvgla.c++;
		// waitStableTime内に選択文字列が変化しているかチェック
		setTimeout(function (){
			tvgla.c--;
			if (tvgla.c == 0){
				var ct = tvgla.getSelectionObject().toString();
				if(so.toString() == ct){
					tvgla.accessToApi(ct);
				}
			}
		}, tvgla.waitStableTime);
	},
	// ポップアップ動作処理
	popUpAction : function(tt, st){
		alert(tt);
	},
	// APIアクセス
	accessToApi : function(st){
		jQuery.ajax({
			type: "GET",
			url: tvgla.link + "?q=" + st,
			dataType: "jsonp",
			jsonp: "callback",
			timeout: 10000,
			success: function(data) {
				tvgla.popUpAction(data.translatedText, st);
			}
		});
	}
}

// jQuery読み込み
if (typeof jQuery == "undefined"){
	var s = document.createElement("script");
	s.src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
	document.body.appendChild(s);
}

// スマホで選択領域変更の場合touchendから検知出来なくてめんどいのでonselectionchangeのみで
if (document.onselectionchange){
	tvgla.orgfunc = document.onselectionchange
}
document.onselectionchange = function(){
	if(typeof tvgla.orgfunc != "undefined"){
		tvgla.orgfunc();
	}
	tvgla.translateViaGLA();
}