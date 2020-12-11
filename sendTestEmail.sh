while [ -z "$PROJECT" ] || [ ! -d "./src/$PROJECT" ]
do
  echo "Please input the valid target project name (ex: 24-213), type 'exit' to exit:"
  read -r PROJECT
done

echo Your sending project is "$PROJECT"


while [ -z "$EMAIL" ]
do
  echo "Please input the receiver email:"
  read -r EMAIL
done

echo build $PROJECT ...
npm run build $PROJECT

echo Will send to "$EMAIL" ...
TARGET=dist/$(ls dist)


for LANG in en zh ja
do
  if [ -f "${TARGET}/${LANG}.html" ]; then
     mail -s  "$(echo -e 'TEST\nContent-Type: text/html')" "$EMAIL" < "${TARGET}/${LANG}.html"
    echo "${TARGET}/${LANG}.html has been send to $EMAIL"
  fi
done

