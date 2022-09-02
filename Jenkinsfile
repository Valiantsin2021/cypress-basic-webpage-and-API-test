pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git branch: 'main', url: 'https://github.com/Valiantsin2021/cypress-basic-webpage-test.git'
            }
        }
        stage('Install') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm run test'
            }
        }
    }
}
