# 🗒 Kind diary Front

<br/>

[![license](https://img.shields.io/badge/License-GPL-red)](https://en.wikipedia.org/wiki/GNU_General_Public_License)
[![code](https://img.shields.io/badge/Code-Typescript-blue)](https://www.typescriptlang.org/)
[![Framework](https://img.shields.io/badge/Framework-React-orange)](https://react.dev/)
[![member](https://img.shields.io/badge/Project-Personal-brightgreen)](https://github.com/qkrwlgh123)

<br/>

> 개인 일정 관리 및 Task 관리, Archiving 플랫폼 👉 https://diary.kindparks.com/

<br/>

<img src="https://github.com/user-attachments/assets/4e0e861d-6c40-47ed-9079-a2519595c6a6" alt="Image Description" width="900"/>

<br/>

## 📖 Description

개인 일정을 관리하며, 일정에 따른 목표와 해야할 작업들을 기록하고 아카이빙하기 위한 프로젝트입니다.

일정 별로 수립했던 목표와 수행했던 작업들을 캘린더 내에서 한눈에 확인하고,

수립한 목표들에 대한 진행도를 확인하고 이에 대한 피드백에 기반하여 추후 일정을 더 체계적으로 관리하기 위해 기획한 프로젝트입니다.

<br/>

## ⭐ Main Feature

### 일자별 목표 및 수행해야할 일 기록, 조회

- React-query를 활용하여 API 요청 및 Data Caching을 통해 API 중복 호출 방지 구현

### 수립 목표들에 대한 진행률 조회

- 토요일인 경우 팝업을 통한 진행률 및 피드백 메세지 조회

### 다크모드

- Styled-component의 Theme-provider를 활용하여 다크모드, 라이트모드 구현

<br/>

## 💻 Getting Started

### Installation

```
npm install
```

### Develop Mode

```
npm start
```

### Production

```
npm run build
```

<br/>

## 🔧 Stack

- **Language**: TypeScript
- **Library & Framework** : React.js, Styled-component, React-query, Zustand
- **Deploy**: AWS S3, Cloudfront

<br/>

## :open_file_folder: Project Structure

```markdown
public
src
├── api
├── asset
├── function
├── hooks
├── components
├── pages
├── store
│   ├── authStore
│   ├── themeStore
├── styles
│   ├── layout
│   ├── fonts
├── types
├── utils
├── App.tsx
├── index.tsx
package.json
```

<br/>

## 🔨 Architecture

<img src="https://github.com/user-attachments/assets/27fe1e9a-a762-4d55-8616-4f1bc8802244" alt="Image Description" width="1000"/>

<br/>

## 👨‍👩‍👧‍👦 Developer

- **박지호** ([qkrwlgh123](https://github.com/qkrwlgh123))

<br/>

## 👤 Test account

- ID: jiho1024
- Password: pjh1024
