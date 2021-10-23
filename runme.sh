#!/bin/bash
#
# B.H.
#

script=`readlink -f $0`
dir=`dirname $script`
project=`basename $dir`
cd $dir

docker stop $project
docker rm $project


docker run -d --restart always \
	-p 8091:8091 --name $project $project