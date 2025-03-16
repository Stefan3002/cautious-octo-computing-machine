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
        stage('Install wget') {
            steps {
                script {
                    def wgetVersion = sh(script: 'wget --version', returnStatus: true)
                    if (wgetVersion != 0) {
                        echo 'Installing wget'
                        sh 'sudo apt install wget'
                    } else {
                        echo 'Wget already installed'
                    }
                }
            }

        }
        stage('Install gnupg') {
            steps {
                script {
                    def gnupgVersion = sh(script: 'gnupg --version', returnStatus: true)
                    if (gnupgVersion != 0) {
                        echo 'Installing gnupg'
                        sh 'sudo apt install gnupg'
                    } else {
                        echo 'gnupg already installed'
                    }
                }
            }

        }
        stage('Install Trivy'){
            steps {
                script {
                    def trivyVersion = sh(script: 'trivy --version', returnStatus: true)
                    if (trivyVersion != 0) {
                        echo 'Installing Trivy'
                        sh '''
                            wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
                            echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
                            sudo apt-get update
                            sudo apt-get install trivy
                        '''
                    } else {
                        echo 'Trivy already installed'
                    }
                }
            }
        }
        stage('Analyzing Code') {
            failFast true
            parallel {
                stage('OWASP Top 10') {
                    steps {
                        script {
                            def errors = sh(script: 'semgrep scan --config="p/owasp-top-ten" --severity=ERROR --error', returnStatus: true)
                            if(errors)
                                error('Vulnerabilities found!')
                        }

                    }
                }
                stage('React Vulnerabilities') {
                    steps {
                        script {
                             def errors = sh(script: 'semgrep scan --config="p/react" --severity=ERROR --error', returnStatus: true)
                             if(errors)
                                error('Vulnerabilities found!')
                        }

                    }
                }
                stage('JavaScript Vulnerabilities') {
                    steps {
                        script {
                            def errors = sh(script: 'semgrep scan --config="p/javascript" --severity=ERROR --error', returnStatus: true)
                            if(errors)
                                error('Vulnerabilities found!')
                        }

                    }
                }
                stage('Dependencies'){
                    steps {
                        sh 'trivy fs --scanners vuln,secret,misconfig .'
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
