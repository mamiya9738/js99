let questions =[];
let questionsMax = 0;
let viewIndex = 0;
const init =() => {

    questions =[];
    questionsMax = 0;
    viewIndex = 0;

    document.getElementById('question').textContent = "";
    document.getElementById('next').textContent = ">";
    document.getElementById('back').textContent = "<";
    

    document.getElementById('start').style.display ="block";
    document.getElementById('question').style.display ="none";
    document.getElementById('info').style.display ="none";
    document.getElementById('back').style.display ="none";
    document.getElementById('next').style.display ="none";
}
init();

//startボタン
const startClick = () => {
    // チェックボックス群
    const max = 9;
    const $checkElements = document.getElementsByClassName("q-check");

    const checkLen = $checkElements.length;
    let checkIndex = 0;

    // チェックボックスがONの数値を配列に登録
    while(checkIndex < checkLen){
      console.log(checkIndex +','+$checkElements[checkIndex].checked);

      if($checkElements[checkIndex].checked){
          for(let i =0; i< max ;i++){
            questions[questionsMax] = [checkIndex+1,i+1];
            questionsMax++;
          }
      }
      checkIndex++;
    }
    // スタートボタンを消す
    document.getElementById('start').style.display ="none";

    // 出題ボタンとか出す
    document.getElementById('question').style.display ="block";
    document.getElementById('info').style.display ="block";
    document.getElementById('back').style.display ="block";
    document.getElementById('next').style.display ="block";

    // モード
    console.log("--ソート前");
    console.log(questions);
    // さがり
    if(document.getElementById('btnradio2').checked){
        console.log("--ソート(さがり)");
        questions.sort((a, b) => (b[0]*10+b[1]) - (a[0]*10+a[1]));
    }
    // ランダム
    if(document.getElementById('btnradio3').checked){
        console.log("--ソート(ランダム)");
        for(let i = questions.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tmp = questions[i];
            questions[i] = questions[j];
            questions[j] = tmp;
        }
    }

    console.log("--ソート後");
    console.log(questions);
    // 出題
    viewIndex = 0;
    setQuestion(viewIndex);
}

// 問題文の設定
const getQuestion = (question) => {
    return question[0] + '×' + question[1] + ' = ' + question[0] * question[1]; 
}

// 問題文の表示
const setQuestion = (viewIndex) => {
    if(questions.length > 0){
        document.getElementById('question').textContent = getQuestion(questions[viewIndex]);
        document.getElementById('info').textContent = viewIndex+1 + '/' + questionsMax;
    }else{
        document.getElementById('info').textContent = "1から9までをえらんでください";
        
    }
}

// backボタン
const backClick = () => {
    if(viewIndex > 0){
        setQuestion(--viewIndex);
    }
}

// nextボタン
const nextClick = () => {
    console.log(viewIndex);
    console.log(questionsMax);
    if(document.getElementById('next').textContent === "END"){
        init();
        return;
    }
    if(viewIndex < questionsMax-1){
        setQuestion(++viewIndex);
    }
    else{
        document.getElementById('next').textContent = "END";
    }
}
