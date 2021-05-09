K8s Traning homework

#### 简述 kubectl log / describe / apply / delete 命令的功能
1. kubectl log:
输出pod中一个容器的日志,如果pod只包含一个容器则可以省略容器名
kubectl logs [-f] [-p] POD [-c CONTAINER] 
 -c, --container="": 容器名。
 -f, --follow[=false]: 指定是否持续输出日志。
      --interactive[=true]: 如果为true，当需要时提示用户进行输入。默认为true。
      --limit-bytes=0: 输出日志的最大字节数。默认无限制。
 -p, --previous[=false]: 如果为true，输出pod中曾经运行过，但目前已终止的容器的日志。
      --since=0: 仅返回相对时间范围，如5s、2m或3h，之内的日志。默认返回所有日志。只能同时使用since和since-time中的一种。
      --since-time="": 仅返回指定时间（RFC3339格式）之后的日志。默认返回所有日志。只能同时使用since和since-time中的一种。
      --tail=-1: 要显示的最新的日志条数。默认为-1，显示所有的日志。
      --timestamps[=false]: 在日志中包含时间戳。    
eg:
 返回仅包含一个容器的pod nginx的日志快照
$ kubectl logs nginx
 返回pod ruby中已经停止的容器web-1的日志快照
$ kubectl logs -p -c ruby web-1
 持续输出pod ruby中的容器web-1的日志
$ kubectl logs -f -c ruby web-1
 仅输出pod nginx中最近的20条日志
$ kubectl logs --tail=20 nginx
 输出pod nginx中最近一小时内产生的所有日志
$ kubectl logs --since=1h nginx

2. kubectl describe:
kubectl describe 此命令组合调用多条API，输出指定的一个或者一组资源的详细描述。
$ kubectl describe (-f FILENAME | TYPE [NAME_PREFIX | -l label] | TYPE/NAME)
首先检查是否有精确匹配TYPE和NAME_PREFIX的资源，如果没有，将会输出所有名称以NAME_PREFIX开头的资源详细信息
 -f, --filename=[]: 用来指定待描述资源的文件名，目录名或者URL。
 -l, --selector="": 用于过滤资源的Label。
eg:
 描述一个node
$ kubectl describe nodes kubernetes-minion-emt8.c.myproject.internal
 描述一个pod
$ kubectl describe pods/nginx
 描述pod.json中的资源类型和名称指定的pod
$ kubectl describe -f pod.json
 描述所有的pod
$ kubectl describe pods
 描述所有包含label name=myLabel的pod
$ kubectl describe po -l name=myLabel
 描述所有被replication controller “frontend”管理的pod（rc创建的pod都以rc的名字作为前缀）
$ kubectl describe pods frontend

3. kubectl apply:
kubectl apply – 通过文件名或控制台输入，对资源进行配置。接受JSON和YAML格式的描述文件.
kubectl apply -f FILENAME
 -f, --filename=[]: 包含配置信息的文件名，目录名或者URL。
 -o, --output="": 输出格式，使用“-o name”来输出简短格式（资源类型/资源名）。
      --schema-cache-dir="/tmp/kubectl.schema": 如果不为空，将API schema缓存为指定文件，默认缓存到“/tmp/kubectl.schema”。
      --validate[=true]: 如果为true，在发送到服务端前先使用schema来验证输入。
eg:
 将pod.json中的配置应用到pod
$ kubectl apply -f ./pod.json
 将控制台输入的JSON配置应用到Pod
$ cat pod.json | kubectl apply -f -

4. kubectl delete:
通过文件名、控制台输入、资源名或者label selector删除资源。 接受JSON和YAML格式的描述文件。
kubectl delete ([-f FILENAME] | TYPE [(NAME | -l label | --all)])
      --all[=false]: 使用[-all]选择所有指定的资源。
      --cascade[=true]: 如果为true，级联删除指定资源所管理的其他资源（例如：被replication controller管理的所有pod）。默认为true。
  -f, --filename=[]: 用以指定待删除资源的文件名，目录名或者URL。
      --grace-period=-1: 安全删除资源前等待的秒数。如果为负值则忽略该选项。
      --ignore-not-found[=false]: 当待删除资源未找到时，也认为删除成功。如果设置了--all选项，则默认为true。
  -o, --output="": 输出格式，使用“-o name”来输出简短格式（资源类型/资源名）。
  -l, --selector="": 用于过滤资源的Label。
      --timeout=0: 删除资源的超时设置，0表示根据待删除资源的大小由系统决定。



#### 
