pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  parameters {
    booleanParam(name: 'BUILD_DOCKER_IMAGE', defaultValue: true, description: 'Build the production Docker image.')
    booleanParam(name: 'PUSH_DOCKER_IMAGE', defaultValue: false, description: 'Push the Docker image to a registry.')
    string(name: 'IMAGE_NAME', defaultValue: 'farmora-ai', description: 'Docker image name.')
    string(name: 'DOCKER_REGISTRY', defaultValue: '', description: 'Optional registry URL, for example registry.example.com/team.')
    string(name: 'DOCKER_CREDENTIALS_ID', defaultValue: '', description: 'Jenkins credentials ID for Docker registry login.')
  }

  environment {
    PNPM_VERSION = '9'
    NEXT_TELEMETRY_DISABLED = '1'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          node --version
          corepack enable
          corepack prepare pnpm@${PNPM_VERSION} --activate
          pnpm --version
          pnpm install --frozen-lockfile
        '''
      }
    }

    stage('Lint') {
      steps {
        sh 'pnpm lint'
      }
    }

    stage('Build App') {
      steps {
        sh 'pnpm build'
      }
    }

    stage('Build Docker Image') {
      when {
        expression { params.BUILD_DOCKER_IMAGE }
      }
      steps {
        script {
          def shortCommit = env.GIT_COMMIT ? env.GIT_COMMIT.take(7) : 'local'
          env.IMAGE_TAG = "${env.BUILD_NUMBER}-${shortCommit}"
          env.FULL_IMAGE_NAME = params.DOCKER_REGISTRY?.trim()
            ? "${params.DOCKER_REGISTRY}/${params.IMAGE_NAME}:${env.IMAGE_TAG}"
            : "${params.IMAGE_NAME}:${env.IMAGE_TAG}"
          env.LATEST_IMAGE_NAME = params.DOCKER_REGISTRY?.trim()
            ? "${params.DOCKER_REGISTRY}/${params.IMAGE_NAME}:latest"
            : "${params.IMAGE_NAME}:latest"
        }
        sh 'docker build -f dockerfile -t "$FULL_IMAGE_NAME" .'
        sh 'docker tag "$FULL_IMAGE_NAME" "$LATEST_IMAGE_NAME"'
      }
    }

    stage('Validate Helm Chart') {
      steps {
        sh '''
          if command -v helm >/dev/null 2>&1; then
            mkdir -p dist
            helm lint charts/farmora-ai
            helm package charts/farmora-ai --destination dist
          else
            echo "Helm is not installed on this Jenkins agent; skipping chart validation."
          fi
        '''
      }
    }

    stage('Push Docker Image') {
      when {
        allOf {
          expression { params.BUILD_DOCKER_IMAGE }
          expression { params.PUSH_DOCKER_IMAGE }
          expression { params.DOCKER_REGISTRY?.trim() }
          expression { params.DOCKER_CREDENTIALS_ID?.trim() }
        }
      }
      steps {
        withCredentials([usernamePassword(
          credentialsId: params.DOCKER_CREDENTIALS_ID,
          usernameVariable: 'DOCKER_USERNAME',
          passwordVariable: 'DOCKER_PASSWORD'
        )]) {
          sh '''
            echo "$DOCKER_PASSWORD" | docker login "$DOCKER_REGISTRY" --username "$DOCKER_USERNAME" --password-stdin
            docker push "$FULL_IMAGE_NAME"
            docker push "$LATEST_IMAGE_NAME"
          '''
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'dist/*.tgz', allowEmptyArchive: true
    }
  }
}
