#!/bin/bash
echo "started running log-box-readiness-liveness!!!"
nohup /usr/src/app/health.sh &
npm start