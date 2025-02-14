/** Supported Cloud Provider Names */
export enum CloudProviderNames {
  /** Amazon Web Services (AWS) */
  AWS = 'Amazon Web Services (AWS)',
  /** Azure */
  AZURE = 'Azure',
  /** Google Cloud Platform (GCP) */
  GCP = 'Google Cloud Platform (GCP)'
}

/** FastTrack Repository Type Names */
export enum RepositoryTypeNames {
  /** Application Container */
  APP = 'Application',
  /** Deployment Configuration */
  DEPLOY = 'Deployment',
  /** Infrastructure */
  INFRA = 'Infrastructure'
}

/** FastTrack Repository Visibility Names */
export enum RepositoryVisibilityNames {
  /** Internal */
  INTERNAL = 'Internal',
  /** Private */
  PRIVATE = 'Private',
  /** Public */
  PUBLIC = 'Public'
}

/** FastTrack Repository Template Names */
export enum RepositoryTemplateNames {
  /** Application - Python - Flask */
  APP_PYTHON_FLASK = 'Python (Flask)',
  /** Application - Java - Spring */
  APP_JAVA_SPRING = 'Java (Spring)',
  /** Application - Node - Express */
  APP_NODE_EXPRESS = 'Node.js (Express)',
  /** Deployment - ArgoCD */
  DEPLOY_ARGOCD = 'ArgoCD',
  /** Infrastructure - Terraform */
  INFRA_TERRAFORM = 'Terraform'
}

/** FastTrack Application Repository Templates */
export enum FastTrackAppTemplate {
  /** Java (Spring) */
  JAVA_SPRING = 'cloud-starter-app-java',
  /** Node.js (Express) */
  NODE_EXPRESS = 'cloud-starter-app-node',
  /** Python (Flask) */
  PYTHON_FLASK = 'cloud-starter-app-python'
}

/** FastTrack Deployment Repository Templates */
export enum FastTrackDeployTemplate {
  /** ArgoCD */
  ARGOCD = 'cloud-starter-app-deploy'
}

/** FastTrack Infrastructure Repository Templates */
export enum FastTrackInfraTemplate {
  /** Azure */
  AZURE = 'cloud-starter-app-iac',
  /** Google Cloud Platform (GCP) */
  GCP = 'cloud-starter-app-iac-gcp'
}

/** FastTrack Project Templates */
export enum FastTrackProject {
  /** Java (Spring) */
  JAVA_SPRING = 'Java (Spring)',
  /** Node.js (Express) */
  NODE_EXPRESS = 'Node.js (Express)',
  /** Python (Flask) */
  PYTHON_FLASK = 'Python (Flask)'
}

/** Request Type Friendly Names */
export enum FriendlyRequestType {
  /** Copilot Access Request */
  'copilot-access' = 'Copilot Access',
  /** FastTrack Request */
  'fast-track' = 'FastTrack'
}

/** Request Type */
export enum RequestType {
  /** Copilot Access Request */
  COPILOT_ACCESS = 'copilot-access',
  /** FastTrack Request */
  FAST_TRACK = 'fast-track'
}
