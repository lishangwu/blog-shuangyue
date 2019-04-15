#!/bin/bash
#curl http://localhost:3000 -d "param1=value1&param2=value2"

# curl http://127.0.0.1:3000/check_your_status?user=Summer&passwd=12345678
#
# curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/user/login


# curl -X POST -b 'k1=v1;k2=v2' -d '{"username":"zhangsan", "password":"123"}' -H "Content-Type: application/json" http://127.0.0.1:3000/api/user/login

# curl http://127.0.0.1:3000/api/blog/list

curl -X POST -d '{"title":"title", "content":"content123"}' -H "Content-Type: application/json" http://127.0.0.1:3000/api/blog/new

