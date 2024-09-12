#!/bin/bash

minikube kubectl -- apply -f pvc.yaml

minikube kubectl -- apply -f bd-deploy.yaml

minikube kubectl -- apply -f backend-deploy.yaml
minikube kubectl -- apply -f backend-service.yaml

minikube kubectl -- apply -f frontend-deploy.yaml
minikube kubectl -- apply -f frontend-service.yaml

minikube kubectl -- apply -f ingress.yaml

echo "Aplicação implantada com sucesso no Minikube"