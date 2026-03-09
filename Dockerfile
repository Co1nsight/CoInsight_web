# [1단계] React 빌드하기 (Node.js 환경)
FROM node:18-alpine as build

# 빌드 시 환경변수 받기
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

WORKDIR /app
# 패키지 정보 복사 및 설치
COPY package.json package-lock.json ./
RUN npm ci
# 소스 코드 복사 및 빌드 (Vite 프로젝트는 결과물이 /app/dist 에 생성됨)
COPY . .
RUN npm run build

# [2단계] Nginx로 서빙하기
FROM nginx:alpine
# 위에서 빌드한 결과물을 Nginx 경로로 옮김 (Vite는 dist 폴더 사용)
COPY --from=build /app/dist /usr/share/nginx/html
# 우리가 방금 만든 nginx.conf 설정 파일을 덮어씌움
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80, 443 포트 오픈
EXPOSE 80 443
# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
