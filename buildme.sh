#!/bin/bash
#
# B.H.
#

script=`readlink -f $0`
dir=`dirname $script`
project=`basename $dir`
cd $dir

# build Dockerfile
exec docker build -t $project .
