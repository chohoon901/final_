# 이미지의 베이스로 사용할 Node.js 이미지 선택
FROM node:14-alpine

# 앱 디렉토리 생성 및 작업 디렉토리로 설정
WORKDIR /app

# 프로젝트의 package.json과 package-lock.json 복사하여 종속성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# 앱 실행을 위한 명령어 설정
CMD ["npm", "start"]