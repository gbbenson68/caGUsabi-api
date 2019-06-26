#!/bin/bash

API="http://localhost:4741"
URL_PATH="/uploads"
TOKEN="1327f0f3e71a6961f9308b211749884d"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "upload": {
      "name": "'"${NAME}"'",
      "description": "'"${DESC}"'"
    }
  }'

echo
