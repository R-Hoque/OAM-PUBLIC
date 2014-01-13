#!/bin/bash          

# NPMT example
# ./build-npmt.sh ./ ../npmt-build dev ../spatialdev.pem

# USAGE
usage="

$(basename "$0") <git-repo-dir> <build-directory> <deploy type>[-h]

where:
    <git-repo-dir> : path to the git repository
    <build-directory> : path to the build directory
    <deploy type> : dev, prod, local
    <pem file> : path to pem file (if necessary)
    -h : show this help text

example: ./build-oam.sh ./ ../oam-public-build dev ../spatialdev.pem"

while getopts ':hs:' option; do
  case "$option" in
    h) echo "$usage"
       exit
       ;;
  esac
done

# Ensure build directory exists
if [ -d $2 ];then
  echo
  echo "Build directory '" $2 "' exists."

  if [ "$(find "$2" -depth -type d -empty)" ]; then
  	echo
  else
    echo 
  	echo "Removing any prior contents of build directory."
    rm -r $2/*
    find $2 -iname '.*' -maxdepth 1 -type f -exec rm {} \;
    exit
  fi

else
  echo "Build directory '" $2 "' does not exist."
fi


# Export from git repo and stuff into the build directory
(cd $1 && git archive HEAD) | (cd $2 && tar -xf -)

echo "Exported from git repo."

#move into build directory
(cd $2 && grunt)

# copy in .gitignore files
cp $1/php/db.inc $2/php/
cp $1/php/user.inc $2/php/
cp $1/php/login.php $2/php/
cp $1/php/login_salted.php $2/php/
#cp $1/spatialdev.pem $2/

# adjust db.inc for type of deploy
if [ "$3" == "prod" ]; then

  perl -pi -e 's/PROD_DEPLOY=FALSE/PROD_DEPLOY=TRUE/' $2/"php/db.inc"

 	perl -pi -e 's/LOCAL_DEPLOY=TRUE/LOCAL_DEPLOY=FALSE/' $2/"php/db.inc"

elif [ "$3" == "dev" ]; then
	perl -pi -e 's/LOCAL_DEPLOY=TRUE/LOCAL_DEPLOY=FALSE/' $2/"php/db.inc"

fi

# remove old tar package if its there
rm $2".tar.gz"

# tar the build directory
tar -zcf $2.tar.gz $2

# deliver to the appropriate server
if [ "$3" == "prod" ]; then
	scp -i $4 $2.tar.gz ubuntu@54.225.122.47:oam-public

elif [ "$3" == "dev" ]; then
  scp -i $4 $2.tar.gz ubuntu@23.23.164.192:oam-public
fi