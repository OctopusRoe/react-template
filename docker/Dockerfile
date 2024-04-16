FROM node:18.19.1 as builder

WORKDIR /app

COPY . .

RUN npm config get registry
RUN yarn install --frozen-lockfile
RUN ls -l
RUN echo "package restore is success"

RUN yarn build

RUN echo 'build is success'

FROM nginx:latest

# nginx 的全局配置文件
COPY ["/docker/nginx.conf", "/etc/nginx/nginx.conf"]
# nginx 的 default.conf 配置文件
COPY ["/docker/nginx.default.conf", "/etc/nginx/default.conf"]
# web 服务器的配置文件
COPY ["/docker/default.conf", "/etc/nginx/conf.d/default.conf"]

RUN rm -rf /usr/share/nginx/html/*

# 把dist文件下的内容复制到 /usr/share/nginx/html/ 内
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

