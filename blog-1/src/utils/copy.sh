#!/bin/sh

cd /Users/robin/Git/blog-shuangyue/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log

