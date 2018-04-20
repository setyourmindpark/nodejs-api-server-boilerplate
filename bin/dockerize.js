const shell           = require('shelljs');

require('dotenv').config( { path: './docker.env' } );
const env = process.env;

const appContext = {
  appName : env.DOCKER_APP_CONTEXT_APP_NAME,
  version : env.DOCKER_APP_CONTEXT_VERSION,
  //envPrefix : 'SKELETONE_'
};

const dockerConfig = {
  appExposePort : env.DOCKER_APP_CONFIG_APP_EXPOSE_PORT,
  appBindPort : env.DOCKER_APP_CONFIG_APP_BIND_PORT,      // if you wanna change internal port, you should change Dockerfile also ( EXPOSE 4000 ).
  //imageName : appContext.appName + ':' + appContext.version,
  //savePath : rootPath.path + '/' + appContext.appName + '-' + appContext.version
  registryHost : env.DOCKER_REGISTRY_HOST,
  registryPort : env.DOCKER_REGISTRY_PORT,
  registryUser : env.DOCKER_REGISTRY_USER,
  registryPassword : env.DOCKER_REGISTRY_PASSWORD
};

//shell.sed('-i','export ','', require('user-home') + '/.bash_profile').grep('SKELETONE_').toEnd('.env');
//shell.exec('env | grep ' + appContext.envPrefix + ' > .env');   //create .env
shell.exec('docker build --tag ' + appContext.appName + ':' + appContext.version + ' .');
//shell.exec('rm -f .env');   //remove .env
shell.exec('docker run -d --name ' + appContext.appName + '-' + appContext.version + ' -p ' + dockerConfig.appExposePort + ':' + dockerConfig.appBindPort + ' ' + appContext.appName + ':' + appContext.version + '');

shell.exec('docker login -u ' + dockerConfig.registryUser +  ' -p ' + dockerConfig.registryPassword + ' ' + dockerConfig.registryHost + ':' + dockerConfig.registryPort);
shell.exec('docker tag ' + appContext.appName + ':' + appContext.version + ' ' + dockerConfig.registryHost + ':' + dockerConfig.registryPort + '/' + appContext.appName + ':' + appContext.version);
shell.exec('docker push ' + dockerConfig.registryHost + ':' + dockerConfig.registryPort + '/' + appContext.appName + ':' + appContext.version);

//shell.exec('docker save -o ' + dockerConfig.savePath + ' ' + dockerConfig.imageName);         // docker image를 tar로 만들기

//scp -r app-1.0 user@ip:/home/user/          // docker swarm manage( leader ) 서버에 이미지 보내기

//docker load -i app-1.0          // image파일을 docker image로 변환
