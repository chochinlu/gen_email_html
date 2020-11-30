echo Please input your target email:
read -r EMAIL

TARGET=dist/$(ls dist)

if [ -z "$EMAIL" ]; then
  echo "you should input the receiver email."
  exit 0
fi

for LANG in en zh ja
do
  if [ -f "${TARGET}/${LANG}.html" ]; then
     mail -s  "$(echo -e 'TEST\nContent-Type: text/html')" "$EMAIL" < "${TARGET}/${LANG}.html"
    echo "${TARGET}/${LANG}.html has been send to $EMAIL"
  fi
done
