

FROM node:12

# Create a work directory and copy over our dependency manifest files.
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

#COPY /src /app/src
#COPY ["package.json", "package-lock.json*", "./"]
COPY . ./

# If you're using yarn:
#  yarn build
#RUN npm install --production --silent && mv node_modules ../
RUN npm config set color false
RUN npm install
RUN npm run build

# Expose PORT 3000 on our virtual machine so we can run our server
EXPOSE 3000

CMD ["npm", "run", "start"]
