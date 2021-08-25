# FROM nginx:latest
# WORKDIR /usr/share/nginx/html
# COPY /build/index.html index.html

# FROM ubuntu:latest
# RUN apt update && apt install -y nodejs.14.17.0
# RUN apt-get install npm


# ベースイメージの作成
# FROM node:12.16.1

FROM node:14.17.0



# コンテナ内で作業するディレクトリを指定
WORKDIR /usr/src/app
# package.jsonとyarn.lockを/usr/src/appにコピー
COPY ["package.json", "./"]
# パッケージをインストール
RUN npm install
# ファイルを全部作業用ディレクトリにコピー
COPY . .
# コンテナを起動する際に実行されるコマンド
# CMD [ "npm run start" ]

# CMD [ "npm", "run" ,"start" ]


RUN npm uninstall node-sass && npm install node-sass
# RUN npm rebuild node-sass
# RUN npm run build
