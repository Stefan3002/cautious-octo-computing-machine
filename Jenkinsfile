pipeline {
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
        stage('Install npm and node js') {
            steps {
                script {
                    def npmVersion = sh(script: 'npm -v', returnStatus: true)
                    if (npmVersion != 0) {
                        echo 'Installing npm and node js'
                        sh '''
                            sudo apt update
                            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
                            sudo apt install nodejs -y
                            sudo apt install build-essential
                        '''
                    } else {
                        echo 'npm and node js already installed'
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
        stage('Install pip3') {
            steps {
                script {
                    def pipVersion = sh(script: 'pip3 -v', returnStatus: true)
                    if (pipVersion != 0) {
                        echo 'Installing pip3'
                        sh '''
                            sudo apt update
                            sudo apt install python3-pip -y
                        '''
                    } else {
                        echo 'pip3 already installed'
                    }
                }
            }
        }
        stage('Install Semgrep'){
            steps {
                script {
                    def semgrepVersion = sh(script: 'semgrep --version', returnStatus: true)
                    if (semgrepVersion != 0) {
                        echo 'Installing Semgrep'
                        sh 'sudo pip3 install semgrep'
                    } else {
                        echo 'Semgrep already installed'
                    }
                }
            }
        }
        stage('Analyzing Code') {
            failFast true
            parallel {
                stage('OWASP Top 10') {
                    steps {
                        sh 'semgrep scan --config="p/owasp-top-ten" --no-suppress-errors'
                    }
                }
                stage('React Vulnerabilities') {
                    steps {
                        sh 'semgrep scan --config="p/react" --no-suppress-errors'
                    }
                }
                stage('JavaScript Vulnerabilities') {
                    steps {
                        sh 'semgrep scan --config="p/javascript" --no-suppress-errors'
                    }
                }
            }
        }
        stage ('Move to Nginx') {
            steps {
                sh 'sudo mkdir -p /var/www/html/octopus'
                sh 'sudo rm -rf /var/www/html/octopus/dist'  // Safely remove the directory if exists
                sh 'sudo mv dist /var/www/html/octopus'
            }
        }
        stage ('Configure Nginx') {
            steps {
                script {
                    def configFile = '''
                       server {
                           listen 80;
                           location / {
                               return 301 https://85.120.206.53$request_uri;
                           }
                       }
                       server {
                           listen 443 ssl http2;
                           include /etc/nginx/ssl/ssl_all_sites.conf;
                           include /etc/nginx/ssl/ssl_codelighthouse.conf;

                           root /var/www/html/octopus/dist;
                           index index.html;

                           location / {
                               try_files $uri /index.html;
                           }
                       }
                    '''
                    writeFile file: '/etc/nginx/sites-available/octopus.conf', text: configFile
                    def file = new File('/etc/nginx/sites-enabled/octopus.conf')
                    if (!file.exists()) {
                        sh 'sudo ln -s /etc/nginx/sites-available/octopus.conf /etc/nginx/sites-enabled'
                    }
                }
            }
        }
        stage ('Restart Nginx') {
            steps {
                sh 'sudo systemctl reload nginx'
            }
        }
    }
}
