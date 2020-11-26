TARGET="result.txt"

npm run build $1

echo "${1}/en.html\n" >> $TARGET
cat dist/$1/en.html >> $TARGET
echo "\n" >> $TARGET

echo "${1}/zh.html\n" >> $TARGET
cat dist/$1/zh.html >> $TARGET
echo "\n" >> $TARGET

echo "Copy ${1} EN/ZH html result to ${TARGET}"

