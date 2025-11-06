#!/bin/bash
cd /home/kavia/workspace/code-generation/bookstore-hub-94751/bookstore_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

