

FROM node:12

# Create a work directory and copy over our dependency manifest files.
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# This assumes that this is a clean checkout of this branch and doesn't have
# cruft from previous 'developer' runs.
COPY . ./

RUN npm config set color false
RUN npm install
# TODO Revisit - This is technically building for dev or integration at the moment
RUN npm run build-prod

# Expose PORT 3000 on our virtual machine so we can run our server
EXPOSE 3000

CMD ["npm", "run", "start"]
