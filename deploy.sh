#!/usr/bin/env bash

sudo apt-get update
sudo apt-get --assume-yes install nginx curl
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
cd /vagrant/client/bundes-ui
sudo npm install
npm run build

if ! [ -L /var/www/html ]; then
    rm -rf /var/www/html
    ln -fs /vagrant/client/bundes-ui/build /var/www/html
fi

