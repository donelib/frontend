#!/usr/bin/bash

WORK_DIR=/home/ec2-user/build/front
BUILD_DIR=$WORK_DIR/build
RELEASE_PATH=$WORK_DIR/release

BUILD_NAME=$(ls $BUILD_DIR | grep 'build_' | tail -n 1)
BACKUP_PATH=$WORK_DIR/backup/$BUILD_NAME

echo "> cd work dir $WORK_DIR"
cd $WORK_DIR

echo "> copy build file to $BACKUP_PATH"
cp build/$BUILD_NAME $BACKUP_PATH

echo "> link"
ln -sfn $BUILD_DIR/$BUILD_NAME $RELEASE_PATH

exit $?