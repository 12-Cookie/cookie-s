<p align="center">
  <img width="150" height="180" alt="icon" src="https://github.com/seungsimdang/RSS/assets/93538221/9a1b4ae7-2749-45c5-8e58-156aab6b1b96" />
  <h2 align="center">📆 알쓰 - 근무 스캐줄링 APP</h2>
</p>

일정에 맞게 근무 스케줄을 지정하는 웹서비스 <b>"알쓰"</b>입니다.  
<b>"알쓰"</b>는 근무 스케줄을 캘린더를 통해 생성, 관리, 신청할 수 있는 기능을 제공합니다.

## 🔗 배포 링크

https://cookie-s.vercel.app

## 🌟 기능

| /login                   | /dashboard          | /schedule                          | /salary             | /workers               | /notice          | /info             |
| ------------------------ | ------------------- | ---------------------------------- | ------------------- | ---------------------- | ---------------- | ----------------- |
| 일반 로그인, 기업 로그인 | 공지 데이터 연동    | 날짜별 스케줄 확인 및 신청(S)      | 날짜별 급여 확인(S) | 유저 리스트 확인(A)    | 공지사항 확인(S) | 유저 정보 확인(S) |
| 회원가입                 | 스케줄 데이터 연동  | 날짜별 스케줄 생성 (A)             |                     | 유저 세부 정보 확인(A) | 공지사항 작성(A) | 회사 정보 확인(A) |
| 기업 코드 구분           | 급여 차트 생성(S)   | 스케줄 신청 현황 리스트(S)         |                     |                        |                  |                   |
| 필수 정보 입력           | 유저 리스트 출력(A) | 스케줄 생성 리스트 및 신청 현황(A) |                     |                        |                  |                   |
|                          |                     | 역할 배정(A)                       |                     |                        |                  |                   |

## 🛠️ 기술 스택

```jsx
1. React
2. vite.js
3. zustand
4. Chakra Ui
5. firebase
```

## 📚 서브 라이브러리

```jsx
1. React-calendar
2. styled-components
3. react-router-dom
4. react-chartjs-2
```

## 📁 디렉토리 구조

```markdown
cookie
├─src
│ ├─assets
│ ├─components
│ │ └─common
│ │ └─BottomNav
│ │ └─...
│ │ └─NoticeItem
│ │ └─...
│ │ └─ScheduleItem
│ │ └─...
│ │ └─ScheduleRoleItem
│ │ └─...
│ │ └─ScheduleUtilItem
│ │ └─...
│ │ └─DashBoard
│ │ └─...
│ │ └─Icons
│ │ └─...
│ │ └─Login
│ │ └─...
│ │ └─Schedule
│ │ └─...
│ ├─firebase
│ │ └─firebase.js
│ ├─hooks
│ │ └─...
│ ├─pages
│ │ └─DashBoard
│ │ └─...
│ │ └─Info
│ │ └─...
│ │ └─Login
│ │ └─...
│ │ └─NotFound
│ │ └─...
│ │ └─Notice
│ │ └─...
│ │ └─Salary
│ │ └─...
│ │ └─Schedule
│ │ └─...
│ │ └─Workers
│ │ └─...
│ ├─theme
│ │ └─index.js (chakra ui theme config)
│ ├─utils
│ │ └─...
│ ├─store
│ │ └─...
│ ├─App.css
│ ├─App.jsx
│ ├─index.css
│ └─main.jsx
└─index.html
```

## 💽 데이터 구조

👬 **users**

| id(store) | name   | phone  | companyId | isAdmin(store) | gender | payPerHour | birthDate | address |
| --------- | ------ | ------ | --------- | -------------- | ------ | ---------- | --------- | ------- |
| string    | string | string | string    | boolean        | string | number     | string    | string  |

```jsx
// firebase
firestore -> users -> userId(firebase auth에 저장된 id) -> data
```

🏢 **company**

| id     | name   | code   | address | roles |
| ------ | ------ | ------ | ------- | ----- |
| string | string | number | string  | array |

```jsx
// firebase
firestore -> company-> companyId -> data
```

🦹 **bookedShifts**

| id     | companyId | scheduleId | scheduleId |
| ------ | --------- | ---------- | ---------- |
| string | string    | array      | string     |

```jsx
// firebase
firestore -> bookedShifts-> bookedShiftsId -> data
```

🛺 **schedule**

| id     | companyId | date                      | status | time                | numWorkers | timestamp |
| ------ | --------- | ------------------------- | ------ | ------------------- | ---------- | --------- |
| string | string    | object {day, month, year} | string | object {end, start} | number     | Timestamp |

```jsx
// firebase
firebase -> schedule -> scheduleId -> data
```

🐓 **notice**

| id     | title  | content | companyId | date | timestamp |
| ------ | ------ | ------- | --------- | ---- | --------- |
| string | string | string  | string    | date | Timestamp |

```jsx
// firebase
firebase -> notice -> noticeId -> data
```

## 🧐 브랜치 전략

### `main 브랜치`

소비자가 사용하는 제품이 존재하는 (배포될 코드가 있는) 브랜치

- PR받는 브랜치: develop

### `develop 브랜치`

개발 단계의 코드가 있는 (개발의 중심) 브랜치

개발 자체는 feature 브랜치에서 진행

- PR받는 브랜치: feature/#이슈번호

### `feature/#이슈번호 브랜치`

특정한 기능 (단위 기능) 을 구현하는 브랜치

기능 구현이 완료되면, develop 브랜치로 pr

- PR나가는 브랜치: develop

## 🏄‍♂️ 역할 분배

🥨 윤태관

```jsx
1. 대시보드 (급여 차트) 페이지
2. 스케줄 컴포넌트
3. 공지사항 컴포넌트
```

🥯 심정아

```jsx
1. 앱 기본 디자인
2. 유저, 회사 정보 페이지
3. 공지사항 페이지
4. 급여 페이지
```

🥞 이용훈

```jsx
1. 프로젝트 환경 세팅
2. 스케줄 관리 페이지
3. 역할 배정 페이지
```

🥪 이승현

```jsx
1. 로그인 페이지
2. 인증 관련 로직 구현
2. 유저 상태관리
```

🌮 채민석

```jsx
1. 날짜 별 스케줄 확인
2. 스케줄 생성페이지+폼
3. 스케줄 신청 페이지
```

## 🖼️ 레이아웃

![레이아웃](https://github.com/seungsimdang/RSS/assets/93538221/fb039828-c947-460a-bb6a-f6ecfaa38948)

## 🚣 유저 플로우

![유저 플로우](https://github.com/seungsimdang/RSS/assets/93538221/9687797c-a533-40f3-b0bc-b74d2a89af22)

## 📦 프로젝트 아키텍처

![프로젝트 아키텍처](https://github.com/12-Cookie/cookie-s/assets/93538221/1af8be65-bee3-4fc6-9360-b1f0d1190c2f)

## ❓추가 예정된 기능

- 프로필 사진
- 푸시알림
- 브라우저 테스트
