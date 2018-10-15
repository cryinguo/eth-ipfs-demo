### 项目介绍
1. 基于ipfs-api 的存储系统，通过react设计前端，eth-ipfs-service 后台使用 mongodb存储数据
2. eth-ipfs 是 fork 的别人的项目 : https://github.com/mcchan1/eth-ipfs，此项目需要先部署存储合约，并且把合约的abi和address替换到 src/storagehash.js中。
3. 路由系统采用单页面路由，借鉴的这个项目: https://github.com/youngwind/mini-react-router
4. 在原来项目的基础上增加了自己的一些功能，配合自己的服务端 eth-ipfs-service 使用

### 运行前提
1. 本地下载并启动 mongodb 数据库
  1.1 brew install mongodb
  1.2 brew services start mongodb 
2. 本地下载并启动 ipfs daemon (设置跨域访问，参考 可能遇到的问题1)
  2.1 ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
  2.2 ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
  2.3 ipfs daemon
3. 安装 metamask 注册ropsten 测试网地址并且有余额
4. 程序默认把文件存在了 ipfs MFS 下的 /test1/ 路径下，可以考虑新建这个路径: 命令行输入 ipfs files mkdir /test1
5. 文件下载的默认存储位置在 eth-ipfs-service/download 路径下, 需要手动新建这个路径

### 项目运行：
1. git clone 本项目
2. 分别进入 eth-ipfs-service 和 my-eth-ipfs 目录下
3. 分别执行 npm install 安装依赖包
4. 在 eth-ipfs-service 目录下 执行 npm run hot  热启动服务
5. 在my-eth-ipfs 目录下执行 npm run start 启动 react

### 可能遇到的问题：
1. 添加文件没有获取到 hash ,报错说 CORS 访问403: 因为访问ipfs本地的5001端口被拒绝，需要设置跨域访问，参考https://github.com/INFURA/tutorials/wiki/IPFS-and-CORS
2. service 启动后意外退出之后需要修改， my-eth-ipfs 与 eth-ipfs-service 两处项目下的config 文件的端口使其一致。
3. ubuntu 可能会遇到启动失败的问题：Error：watch ENOSPC 报错，原因是达到了 ubuntu 默认的最大监听事件，解决方案参考：https://blog.csdn.net/qq_21460229/article/details/78290740