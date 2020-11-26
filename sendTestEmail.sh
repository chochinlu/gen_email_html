TARGET=dist/$(ls dist)

EN=$TARGET/en.html
ZH=$TARGET/zh.html
JA=$TARGET/ja.html

if [ -z "$1" ]; then
  echo "you should input the receiver email."
  exit 0
fi

cat "$EN" | mail -s  "$(echo -e 'TEST\nContent-Type: text/html')" "$1"
echo "$EN send"


if [ -f "$ZH" ]; then
    cat "$ZH" | mail -s  "$(echo -e 'TEST\nContent-Type: text/html')" "$1"
    echo "$ZH send"
else
    echo "$ZH not exist, ignored"
fi

if [ -f "$JA" ]; then
    cat "$JA" | mail -s  "$(echo -e 'TEST\nContent-Type: text/html')" "$1"
    echo "$JA send"
else
    echo "$JA not exist, ignored"
fi

