#### 网络架构

![截屏2021-04-24 下午3.49.24.png](https://i.loli.net/2021/04/24/auUVerH62sYkRoT.png)


***

### docker网络模式



#### Host模式
（--net=host）该模式下，容器不会虚拟出自己的网卡和IP，而是使用宿主机的IP和端口。
此种模式下，用docker部署的web应用，可以使用宿主机的ip和容器暴露端口从外部访问容器的web页面。 
当使用docker exec或者docker attach进入容器使用if congfig查看IP，看到的会是宿主机的IP。



#### Container模式
（--net=container:NAME_or_ID）这种模式下，容器会和一个指定容器共享一个Network Namespace，即会其共享IP和端口。



#### None模式
（--net=none）使用none模式，Docker 仍然拥有自己的 Network Namespace，但是无网络配置。即没有网卡，IP等信息。



#### Bridge模式
（--net=bridge）此模式会为每一个容器分配、设置IP等，并将容器连接到一个docker0虚拟网桥。除非自己制定网络模式，否则创建的容器默认连接到Docker0(类似交换机).
ocker会从RFC1918所定义的私有IP网段中，选择一个和宿主机不同的IP地址和子网分配给docker0，连接到docker0的容器就从这个子网中选择一个未占用的IP使用。
在bridge模式下，连在同一网桥上的容器可以相互通信。



#### 自定义网络模式
通过docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet
可以自定义网络模式。之后通过docker run启动容器时，可以通过 --net mynet参数使用我们自己定义的网络模式。


***



### AUFS文件系统的特点以及优缺点
1. AUFS使用单一挂载点将多个目录挂载到一起，组成一个栈，对外提供统一的视图，栈中的每个目录作为一个分支。
dockerd的image的就是通过层层叠加存储的，每次修改作为一次commit来层层叠加（类似git）。不同的镜像可以共用共享分层，从而节约内存和空间。
2.  AUFS 支持为每一个成员目录（类似 Git 的分支）设定只读（readonly）、读写（readwrite）和写出（whiteout-able）权限, 
同时 AUFS 里有一个类似分层的概念, 对只读权限的分支可以逻辑上进行增量地修改(不影响只读部分的)。
3. 层数多的文件系统查找文件会出现性能下降的问题。dockerfile中可以通过将多条命令通过&&一起执行，减少层数。



解决性能问题：

1. dockerfile中可以通过将多条命令通过&&一起执行，减少层数

2. 通过数据卷(data volumes)绕过写时复制机制，可以提高性能。


数据库持久化：
1. 可以在执行Docker create或Docker run时，通过-v参数将主机的目录作为容器的数据卷。
从而将数据保存在宿主机上。容器删除后，数据还在。

****


### Docker与虚拟机对比
1.docker与宿主共享内核，而虚拟机需要虛拟出一套硬件,运行一个完整的操作系统,然后在这个系统上安装和运行软件。
因此相比docker,虚拟机有资源占用多/冗余步骤多/启动很慢的缺点。
2.因为虚拟机从硬件层面做到了隔离，所以安全性会高于容器。



****

### Image放置docker hub网址：
后端地址：https://hub.docker.com/r/linkangli/aws-training-backend
前端地址：https://hub.docker.com/r/linkangli/aws-training-front
数据库地址：https://hub.docker.com/r/linkangli/aws-training-redis






