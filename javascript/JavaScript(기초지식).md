JavaScript

- 변수선언
    + let : 변할수 있는값
    + const : 변하지 않는값 

- 자료형
    1. 문자열

        + "" , '' 는 큰 차이 없음

        + `` (백틱 기호)
            + ex) const message = `my name is ${name}`; 과 같이 문자열 내부에 변수 표현할떄 사용

    2. 숫자형(number)
        
        + ex) const age = 30; 
            + 사칙연산도 가능
        
    3. Boolean 
        + const a = ture;
        + const b = false;

    4. null & undefined
        + null : 존재하지 않는 값
        + undefined : 값이 할당되지 않음을 의미

        ```
        let age;
        console.log(age)
        (변수를 선언만하고 아무것도 할당하지 않았기 때문에 결과값 : undefined)

        let user = null;
        -> 유저는 존재하지 않는다는 의미 
        ```
    5. typeof 연산자
        + 변수의 자료형을 알아낼 수 있음

        ```
        const name ="Mike";
        console.log(typeof name);
        ==> "string"
        null != 객체
        ```

- 대화상자
    + alert : 알려주는역할
    + prompt : 입력받는 역할
        ```
        const name = prompt("이름을 입력하세요:");
        alert("환영합니다"+name+"님");

        const name = prompt("예약일을 입력해주세요","2020-10")
        -> 2020-10 이 default 값으로 들어가게 됨 
        ```
    + confirm : 확인 받는 역할
        ```
        const isAdult = confirm("당신은 성인입니까?")
        console.log(isAdult)
        -> 확인을 누르면 true, 취소를 누르면 false , 입력된 값을 통해 이후 작업 수행 
        ```

- 형변환
    - prompt 로 입력받은 값은 String 으로 입력을 받음(그래서 형변환 필요 <- 명시적 형변환)
        + String()
        
            ```
            console.log(
            String(3),
            String(true)
            )
            ```
        + Number()
            ```
            console.log(
                Number("1234")
                Number("true") == > (결과값 : 1, false 는 0)
            )
            ```
- 연산자
    + 우선순위 ( * / > + - )
    + 특정 연산자는 줄여서 사용 가능 
        ```
        let num = 10;
        num += 5; // num = num + 5; 와 동일 
        ```
    + 증감 연산자
        ```
        let num = 10;
        let result = num++; (연산자를 뒤에적으면 증가시키기 전의값 , 앞에적으면 증가시킨 후의 값)
        console.log(result)
        ```
- 비교 연산자
    + == 값만 비교 , === 타입까지 같이 비교()

- 함수
    + 함수작성법
        ```
        function showError(){
            alert("에러발생했어요");
        }
        showError();

        함수      함수명  매개변수
        function sayHello(name){
            const msg = `안녕하세요 저는 ${name}입니다.`;
            console.log(msg);
        }
        sayHello('jinha');
        ```
    + 지역변수와 전역변수는 서로 간섭받지 않음
    
    + OR
        ```
        function sayHello(name = 'friend'){
            let msg = `Hello, ${newName}`
            console.log(name)
        }
        sayHello();
        sayHello('Jane');
        ==> 첫번째값은 빈괄호이므로 "Hello, frient", 두번째값은 Jane 이라고 지정했기때문에 "Hello, Jane"
        ```
        
        ```
        function add(num1, num2){
            return num1 + num2;
        }
        const result add(2,3);
        console.log(result)
        ==> 5 

        ```
    + 함수표현식
        ```
        let sayHello = function(){
                console.log('hello')
        }
        ==> 함수에 도달해야만 선언이 가능 (javaScript 는 위에서 아래로 찾기때문)
        ```
    + 함수 선언문   
        ```
        say Hello();

        function sayHello(){
            console.log('hello');
        }
        어디서든 선언 가능(호이스팅)
        ```   
    
    + 화살표 함수
    ```
    let add = function(num1,num2){
        return num1+ num2;
    }
    //이 코드를
    let add = (num1,num2)=> {
        return num1+num2;
    }
    로 사용 가능 (return 문은 중괄호대신 소괄호 사용 가능, return 문이 1줄이라면 괄호도 생략가능)
    ```
+ 객체(Object)
    ```
    const supernam = {
        name:'jinha',
        age: 33,
    }
    접근 ->
        superman.name
        superman['age']
    추가 ->
        superman.gender='male';
        superman['hairColor']='black';
    삭제 ->
        delete superman.hairColor;   
    ```
    - for ... in 반복문
        ```
        for(let key in superman){
            console.log(key)
            console.log(superman[key])
        }
        ```
    - method(객체 프로퍼티로 할당된 함수)
        ```
        const superman = {
            name= 'jinha',
            age : 33,
            fly(){
                console.log("날라간다~')
            }
        }
        superman.fly() 
        ==> 날라간다~
        ```

        ```
        let boy ={
            name : "Mike",
            sayThis(): () =>{
                console.log(this);
            }
        };
        boy.sayThis();
        이 상황에서 this는 boy를 가리키는것이 아닌 window 전역객체를 가리키게 됨
        그래서 객체의 메소드를 작성할때 화살표 함수는 xx
        ```
- 배열
    + psuh() -> 맨뒤 배열 추가
    + pop() 맨뒤 배열 삭제
    + unshift() -> 배열 앞에 추가
    + shift() -> 배열 앞에 제거

    + 반복문 for...of
        ```
        let days =['월','화','수']
        for(let day of days){
            console.log(day)
        }
        ``