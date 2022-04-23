let questions = [];
let questionsMax = 0;
let viewIndex = 0;
const endMessage ='おわり';
const backMessage ='もどる';
const nextMessage ='すすむ';

const upMessage = 'あがり';
const downMessage = 'さがり';
const mixMessage = 'まざり';

const danMessage = '段';
const answerMessage = '答え';

const cancelMessage = 'キャンセル';
const patternMessage = '出し方';
const startMessage = 'スタート';
const init = () =>{
    questions = [];
    questionsMax = 0;
    viewIndex = 0;

    document.getElementById('question-message').textContent = "";
    document.getElementById('answer-message').textContent = "";
    document.getElementById('info-message').textContent = "";
    document.getElementById('next-message').textContent = nextMessage;
    document.getElementById('back-message').textContent = backMessage;
    document.getElementById('dan-list-title').textContent = danMessage;
    document.getElementById('answer-view-title').textContent = answerMessage;
    document.getElementById('format-list-title').textContent = patternMessage;
    document.getElementById('start').textContent = startMessage; 


    document.getElementById('dan-list').style.display ="block";
    document.getElementById('format-list').style.display ="block";
    document.getElementById('answer-view').style.display ="block";
    document.getElementById('start').style.display ="block";
    document.getElementById('question').style.display ="none";
    document.getElementById('answer').style.display ="none";
    document.getElementById('info').style.display ="none";
    document.getElementById('back').style.display ="none";
    document.getElementById('next').style.display ="none";
    document.getElementById('back-message').style.display ="none";
    document.getElementById('next-message').style.display ="none";
}
init();
//startボタン
const startClick = () => {

    if(document.getElementById('start').textContent === cancelMessage){
        init();
        return;
    }

    // チェックボックス群を変数に入れる
    const max = 10;
    const $checkElements = document.getElementsByClassName("q-check");

    const checkLen = $checkElements.length;
    let checkIndex = 0;

    // チェックボックスがONの段を配列に登録
    while(checkIndex < checkLen){
      console.log(checkIndex +','+$checkElements[checkIndex].checked);

      if($checkElements[checkIndex].checked){
        var context = ",";
        // 段の枠に選択数値を表示させる
        if(questionsMax == 0){
            context = ";";
        }
        document.getElementById('dan-list-title').textContent += context + (checkIndex + 1) + " ";

        // 問題を作成し、配列に入れる
        for(let i = 1; i < max ;i++){
            questions[questionsMax++] = [checkIndex + 1 , i ];            
          }
      }
      checkIndex++;
    }
    // スタートボタンをキャンセルボタンにする
    document.getElementById('start').textContent = cancelMessage;

    // 出題形式選択枠を消す
    document.getElementById('dan-list').style.display ="none";
    document.getElementById('format-list').style.display ="none";
    document.getElementById('answer-view').style.display ="none";
    

    // 出題ボタンとか出す
    document.getElementById('question').style.display ="block";
    document.getElementById('info').style.display ="block";
    document.getElementById('back').style.display ="block";
    document.getElementById('next').style.display ="block";
    document.getElementById('back-message').style.display ="block";
    document.getElementById('next-message').style.display ="block";

    // 答え出す時だけ回答枠表示
    if(document.getElementById('answer-view-on').checked){
        document.getElementById('answer').style.display ="block";
        document.getElementById('answer-view-title').textContent += (":あり");
    }else{
        document.getElementById('answer-view-title').textContent += (":なし");
    }

    // 出題形式
    // console.log("--ソート前");
    // console.log(questions);
    //出題形式ごとで配列をそーとする
    var formatMessage = upMessage;
    if(document.getElementById('btnradio2').checked){
        // さがり
        // console.log("--ソート(さがり)");
        questions.sort((a, b) => (b[0]*10+b[1]) - (a[0]*10+a[1]));
        formatMessage = downMessage;

    }else if(document.getElementById('btnradio3').checked){
        // ランダム
        // console.log("--ソート(ランダム)");
        for(let i = questions.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tmp = questions[i];
            questions[i] = questions[j];
            questions[j] = tmp;
        }
        formatMessage = mixMessage;
    }
    document.getElementById('format-list-title').textContent += (":" + formatMessage);

    // console.log("--ソート後");
    // console.log(questions);
    // 出題
    viewIndex = 0;
    setQuestion(viewIndex);
}

// 問題文の設定
const getQuestion = (question) => {
    return '問題：' + question[0] + '×' + question[1]; 
}

// 回答の設定
const getAnswer = (question) => {
    return '回答:' + question[0] * question[1]; 
}

// 問題文の表示
const setQuestion = (viewIndex) => {
    if(questions.length > 0){
        document.getElementById('question-message').textContent = getQuestion(questions[viewIndex]);
        if(document.getElementById('answer-view-on').checked){
            document.getElementById('answer-message').textContent = getAnswer(questions[viewIndex]);
        }
        document.getElementById('info-message').textContent = viewIndex+1 + '/' + questionsMax;
    }else{
        alert("1から9までをえらんでください");
        init();
    }
}

// backボタン
const backClick = () => {
    if(viewIndex > 0){
        setQuestion(--viewIndex);
        document.getElementById('next-message').textContent = next_message;
    }
}

// nextボタン
const nextClick = () => {
    console.log(viewIndex);
    console.log(questionsMax);
    // 終わりボタンをクリックしていたら
    if(document.getElementById('next-message').textContent === endMessage){
        init();
        return;
    }
    if(++viewIndex < questions.length){
        setQuestion(viewIndex);
        // 最後の表示内容になったときは「次へ」ボタンを終わりボタンに変更する
        if(viewIndex + 1 == questions.length){
            document.getElementById('next-message').textContent = endMessage;
        }
    }
}

