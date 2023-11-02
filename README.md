# 프로젝트

## 🛠️ 도구

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

## 📁 폴더 구조

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

## 🌟 기능

| /login                   | /dashboard          | /schedule                          | /salary             | /workers               | /notice          | /info             |
| ------------------------ | ------------------- | ---------------------------------- | ------------------- | ---------------------- | ---------------- | ----------------- |
| 일반 로그인, 기업 로그인 | 공지 데이터 연동    | 날짜별 스케줄 확인 및 신청(S)      | 날짜별 급여 확인(S) | 유저 리스트 확인(A)    | 공지사항 확인(S) | 유저 정보 확인(S) |
| 회원가입                 | 스케줄 데이터 연동  | 날짜별 스케줄 생성 (A)             |                     | 유저 세부 정보 확인(A) | 공지사항 작성(A) | 회사 정보 확인(A) |
| 기업 코드 구분           | 급여 차트 생성(S)   | 스케줄 신청 현황 리스트(S)         |                     |                        |                  |                   |
| 필수 정보 입력           | 유저 리스트 출력(A) | 스케줄 생성 리스트 및 신청 현황(A) |                     |                        |                  |                   |
|                          |                     | 역할 배정(A)                       |                     |                        |                  |                   |

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

## 💽 데이터

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

## 🖼️ 레이아웃

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FtbI9upYwpdZbiO2hDk9j7S%2FUntitled%3Ftype%3Ddesign%26node-id%3D33%3A704%26mode%3Ddesign%26t%3DjBXeOKkjpt777Frt-1](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FtbI9upYwpdZbiO2hDk9j7S%2FUntitled%3Ftype%3Ddesign%26node-id%3D33%3A704%26mode%3Ddesign%26t%3DjBXeOKkjpt777Frt-1)

## 🚣 유저 플로우

## 📦 프로젝트 아키텍처

![아키텍처](https://github.com/12-Cookie/cookie-s/assets/93538221/1af8be65-bee3-4fc6-9360-b1f0d1190c2f)


## ❓ 예정 사항

- 프로필 사진
- 푸시알림
- 브라우저 테스트
