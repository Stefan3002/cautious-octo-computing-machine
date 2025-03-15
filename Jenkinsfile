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
                sh 'mkdir -p /var/www/html/octopus'
                sh 'mv build /var/www/html/octopus'
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
                sh 'ln -s /etc/nginx/sites-available/octopus.conf /etc/nginx/sites-enabled'
            }
        }
        stage ('Restart Nginx') {
            steps {
                sh 'sudo systemctl reload nginx'
            }
        }
    }
}