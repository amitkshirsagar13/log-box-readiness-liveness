#!/bin/bash
echo $READINESS $LIVENESS
mkdir -p /tmp/health
sleep $READINESS
touch /tmp/health/readiness

if [ $READINESS -lt $LIVENESS ]; then
    LIVENESS=$(( $LIVENESS + $READINESS ))
fi

LIVENESS=$(( $LIVENESS - $READINESS ))
sleep $LIVENESS
touch /tmp/health/liveness
ls -ltr /tmp/health