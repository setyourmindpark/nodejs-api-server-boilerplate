FROM setyourmindpark/debian-node:8

RUN apt-get update && \
    apt-get install -y build-essential && \
    apt-get install -y python-software-properties && \
    apt-get install -y python && \
    apt-get install -y g++ && \
    apt-get install -y make && \
    npm install -y pm2 -g

# 앱 디렉토리 생성
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package.json /usr/src/app/
RUN npm install

# 앱 소스 추가
COPY . /usr/src/app

EXPOSE 4000
CMD ["pm2-docker", "bin/www.js"]
