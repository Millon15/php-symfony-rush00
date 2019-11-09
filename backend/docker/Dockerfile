FROM ubuntu:16.04

ARG PROJECT_NAME=d04
ARG WORKDIR=/var/www/$PROJECT_NAME
ARG USER

RUN apt-get clean \
    && apt-get -y update \
    && apt-get install -y locales curl software-properties-common git supervisor vim sudo \
    && locale-gen en_US.UTF-8

RUN LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php \
    && apt-get update -y \
    && apt-get -y install nginx composer php7.3 php7.3-fpm \
        php7.3-xml php7.3-pgsql php7.3-zip php7.3-intl php7.3-ldap php7.3-soap php7.3-mbstr php7.3-curl \
        php7.3-gd php7.3-iconv php7.3-bcmath php7.3-sockets
#        php7.3-xdebug

RUN mkdir -p /var/www/logs \
    && chmod -R 0777 /var/www/logs \
    && mkdir -p $WORKDIR


WORKDIR $WORKDIR

RUN service nginx stop
RUN service php7.3-fpm stop

# Nginx config
RUN rm -Rf /etc/nginx/sites-enabled/* \
    && rm -Rf /etc/nginx/sites-available/*
COPY config/$PROJECT_NAME.conf /etc/nginx/sites-available/
COPY config/supervisord.conf /etc/supervisord.conf
RUN ln -fs /etc/nginx/sites-available/$PROJECT_NAME.conf /etc/nginx/sites-enabled/$PROJECT_NAME.conf

#RUN usermod -u 1000 www-data
#RUN useradd -G www-data -m $USER

RUN sed -i -E \
        -e "s/;date.timezone =.*/date.timezone = UTC/" /etc/php/7.3/cli/php.ini \
        -e "s/;date.timezone =.*/date.timezone = UTC/" /etc/php/7.3/fpm/php.ini \
        -e "s/display_errors = Off/display_errors = On/" /etc/php/7.3/fpm/php.ini \
        -e "s/upload_max_filesize = .*/upload_max_filesize = 10M/" /etc/php/7.3/fpm/php.ini \
        -e "s/post_max_size = .*/post_max_size = 12M/" /etc/php/7.3/fpm/php.ini \
        -e "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/" /etc/php/7.3/fpm/php.ini \
#        -e "s/listen = .*/listen = 9000/" /etc/php/7.3/fpm/pool.d/www.conf \
#        -e "s/user = .*$/user = $USER/" /etc/php/7.3/fpm/pool.d/www.conf
#        -e "s/user(\s*)([\-\w]+)$/user $USER/" /etc/nginx/nginx.conf \
        -e "s/pid =.*/pid = \/var\/run\/php7.3-fpm.pid/" /etc/php/7.3/fpm/php-fpm.conf \
        -e "s/error_log =.*/error_log = \/proc\/self\/fd\/2/" /etc/php/7.3/fpm/php-fpm.conf \
        -e "s/;daemonize\s*=\s*yes/daemonize = no/g" /etc/php/7.3/fpm/php-fpm.conf \
        -e "s/;catch_workers_output = .*/catch_workers_output = yes/" /etc/php/7.3/fpm/pool.d/www.conf

RUN mkdir -p /run/php

COPY . .

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]
EXPOSE 80
RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN service nginx start
RUN service php7.3-fpm start
