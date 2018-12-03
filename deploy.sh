#/bin/bash

cd vue-frontend;
npm run build;
tar -C dist -czf deploy.tar.gz . \
  && echo "SSH Copying tar.gz" && scp deploy.tar.gz jonathan:~/bin/ \
  && echo "Extracting tar" && ssh jonathan 'cd ~/bin && ./extract-tar.sh' \
  && rm deploy.tar.gz;
echo "Deploy script ran";
