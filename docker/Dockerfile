# ベースイメージの指定
FROM node:lts-alpine3.20
 
# 作業ディレクトリの指定
WORKDIR /var/www/html/app
 # 依存関係のインストール
COPY app/package*.json ./
RUN npm install --legacy-peer-deps

# アプリケーションコードのコピー
COPY ./app /var/www/html/app

# アプリケーションの起動
CMD ["sh", "-c", "cd app && npm run dev"]