# micro-vue

### nginx 配置

~~~
server {
    listen       80;
    server_name  mic.missxiaolin.com;

	location / {
		root /Users/xiaolin/web/miss/micro-vue/mic-main/dist;
		index index.php index.html index.htm;
    		# add_header Cache-Control;
    		add_header Access-Control-Allow-Origin *;
    		if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){
      			add_header Cache-Control max-age=7776000;
      			add_header Access-Control-Allow-Origin *;
    		}
		try_files $uri $uri/ /index.html;
  	}


	# 子应用child-vue3
	set $uri_prefix "/vue3";
  	location /vue3 {
    		alias /Users/xiaolin/web/miss/micro-vue/mic-vue/dist;
    		add_header Access-Control-Allow-Origin *;
    		if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){
      			add_header Cache-Control max-age=7776000;
      			add_header Access-Control-Allow-Origin *;
    		}
		try_files $uri $uri/ /index.html$is_args$args;
    		#try_files $uri $uri/ /vue3/index.html;
  	}

	# 子应用child-vue3-vie
        set $uri_prefix "/vie";
        location /vie {
                alias /Users/xiaolin/web/miss/micro-vue/mic-vie/dist;
                add_header Access-Control-Allow-Origin *;
                if ( $request_uri ~* ^.+.(js|css|jpg|png|gif|tif|dpg|jpeg|eot|svg|ttf|woff|json|mp4|rmvb|rm|wmv|avi|3gp)$ ){
                        add_header Cache-Control max-age=7776000;
                        add_header Access-Control-Allow-Origin *;
                }
                try_files $uri $uri/ /index.html$is_args$args;
                #try_files $uri $uri/ /vue3/index.html;
        }

}
~~~