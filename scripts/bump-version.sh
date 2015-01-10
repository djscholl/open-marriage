old_ver=$1
new_vers=$2
files="bower.json npm-shrinkwrap.json package.json public/js/main.js public/js/maps.js public/js/rsvp.js public/js/wedding.js"

echo "bumping version $1 -> $2"
for f in ${files} ; do
    echo $f
    sed -i '' "s/$1/$2/" $f
#   git checkout $f
done
