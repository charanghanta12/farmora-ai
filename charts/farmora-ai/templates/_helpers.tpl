{{/*
Expand the name of the chart.
*/}}
{{- define "farmora-ai.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "farmora-ai.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "farmora-ai.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels.
*/}}
{{- define "farmora-ai.labels" -}}
helm.sh/chart: {{ include "farmora-ai.chart" . }}
{{ include "farmora-ai.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels.
*/}}
{{- define "farmora-ai.selectorLabels" -}}
app.kubernetes.io/name: {{ include "farmora-ai.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use.
*/}}
{{- define "farmora-ai.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "farmora-ai.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Secret name for environment variables.
*/}}
{{- define "farmora-ai.secretName" -}}
{{- if .Values.existingSecretEnv.enabled }}
{{- .Values.existingSecretEnv.secretName }}
{{- else if .Values.secretEnv.name }}
{{- .Values.secretEnv.name }}
{{- else }}
{{- printf "%s-env" (include "farmora-ai.fullname" .) }}
{{- end }}
{{- end }}
