echo "Please input your target file name (default is result):"
read -r TARGET

if [ "$TARGET" = "" ]; then
  TARGET="result"
fi

echo "The result will be outputted to $TARGET"

echo "Please input your project main name (ex: 134, 24):"
read -r PROJECT

PROJECT_LIST=$(cd src && ls -d "$PROJECT"-*)

for project in $PROJECT_LIST
do
  npm run build $project
  for lang in en zh ja
  do
    if [ -f "dist/${project}/${lang}.html" ]; then
      echo copy "${project}/${lang}.html"
      {
        printf "%s/%s.html\n" "$project" "$lang"
        cat "dist/${project}/${lang}.html"
        printf "\n\n"
      } >> $TARGET
    fi
  done
done
echo done!!

