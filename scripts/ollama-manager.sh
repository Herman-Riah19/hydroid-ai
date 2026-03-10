#!/bin/bash

# Hydroid AI - Ollama Model Management Script
# This script helps manage AI models for the Hydroid platform

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== Hydroid AI - Ollama Model Manager ===${NC}\n"

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo -e "${RED}Ollama is not installed. Please install it first:${NC}"
    echo "curl -fsSL https://ollama.com/install.sh | sh"
    exit 1
fi

# Function to pull recommended models
pull_models() {
    echo -e "${YELLOW}Pulling recommended models for Hydroid AI...${NC}\n"
    
    models=(
        "qwen2.5:14b"
        "qwen2.5:7b"
        "llama3.2:3b"
        "llama3.2:1b"
        "mistral:7b"
        "nomic-embed-text:latest"
    )
    
    for model in "${models[@]}"; do
        echo -e "${GREEN}Pulling $model...${NC}"
        ollama pull "$model"
        echo -e "${GREEN}✓ $model installed${NC}\n"
    done
}

# Function to list installed models
list_models() {
    echo -e "${YELLOW}Installed models:${NC}\n"
    ollama list
}

# Function to start Ollama server
start_server() {
    echo -e "${GREEN}Starting Ollama server...${NC}"
    ollama serve &
    echo -e "${GREEN}Ollama server started on http://localhost:11434${NC}"
}

# Function to create custom model
create_model() {
    if [ -z "$1" ]; then
        echo "Usage: $0 create <model-name>"
        exit 1
    fi
    
    echo -e "${GREEN}Creating custom model: $1${NC}"
    
    # Create Modelfile
    cat > Modelfile <<EOF
FROM qwen2.5:14b

PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER top_k 40

SYSTEM You are Hydroid AI, an advanced intelligence and analysis assistant.
EOF
    
    ollama create "$1" -f Modelfile
    echo -e "${GREEN}Model $1 created successfully${NC}"
}

# Function to test model
test_model() {
    model="${1:-qwen2.5:14b}"
    echo -e "${YELLOW}Testing $model (type 'exit' to quit)${NC}\n"
    ollama run "$model"
}

# Main menu
case "${1:-}" in
    pull)
        pull_models
        ;;
    list)
        list_models
        ;;
    start)
        start_server
        ;;
    create)
        create_model "$2"
        ;;
    test)
        test_model "$2"
        ;;
    *)
        echo "Usage: $0 {pull|list|start|create|test}"
        echo ""
        echo "Commands:"
        echo "  pull           Pull recommended models for Hydroid AI"
        echo "  list           List installed models"
        echo "  start          Start Ollama server"
        echo "  create <name>  Create custom model"
        echo "  test [model]   Test a model (default: qwen2.5:14b)"
        exit 1
        ;;
esac
