# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable
ENV REACT_APP_SERVER_URL="http://localhost:8080/ba_se1_app/rest"
COPY --from=build /app/build /usr/share/nginx/html
#RUN chgrp -R 0 /var/cache/nginx && chmod -R g=u /var/cache/nginx
#RUN chgrp -R 0 /var/run && chmod -R g=u /var/run
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
USER 1001
CMD ["nginx", "-g", "daemon off;"]
