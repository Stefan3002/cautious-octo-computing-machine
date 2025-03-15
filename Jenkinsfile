pipeline{
    agent any
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Install npm and node js'){
            steps {
                script {
                    try {
                        try {
                            sh 'npm -v'
                            echo 'Already installed npm and node js'
                        }catch(Exception e) {
                            echo 'Installing npm and node js'
                            sh '''
                                sudo apt update
                                curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
                                sudo apt install nodejs -y
                                sudo apt install build-essential
                            '''
                        }

                    }catch(Exception e) {
                        echo 'Failed to install npm and node js'
                        error 'Failed to install npm and node js'
                    }
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm i'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage ('Move to Nginx') {
            steps {
                sh 'sudo mkdir -p /var/www/html/octopus/build'
                sh 'sudo mv build /var/www/html/octopus/build'
            }
        }
        stage ('Configure Nginx'){
            steps {
                script {
                    def configFile = """
                       server {
                        listen 80;
                        root /var/www/html/octopus/build;
                        index index.html;

                        location / {
                            try_files $uri /index.html;
                        }
                       }
                    """
                    writeFile file: '/etc/nginx/sites-available/octopus.conf', text: configFile
                }
                sh 'sudo ln -s /etc/nginx/sites-available/octopus.conf /etc/nginx/sites-enabled'
            }
        }
        stage ('Restart Nginx') {
            steps {
                sh 'sudo systemctl reload nginx'
            }
        }
    }
}