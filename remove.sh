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

