#!/bin/bash

# Hydroid AI - LM Studio Management Script
# This script helps manage AI models using LM Studio

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== Hydroid AI - LM Studio Manager ===${NC}\n"

# Default LM Studio API settings
LM_STUDIO_HOST="${LM_STUDIO_HOST:-localhost}"
LM_STUDIO_PORT="${LM_STUDIO_PORT:-1234}"
LM_STUDIO_API_BASE="http://${LM_STUDIO_HOST}:${LM_STUDIO_PORT}/v1"

# Function to check LM Studio connection
check_connection() {
    echo -e "${YELLOW}Checking LM Studio connection...${NC}"
    
    if curl -s --max-time 5 "${LM_STUDIO_API_BASE}/models" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Connected to LM Studio at ${LM_STUDIO_API_BASE}${NC}"
        return 0
    else
        echo -e "${RED}✗ Cannot connect to LM Studio${NC}"
        echo "Please ensure LM Studio is running with API server enabled"
        echo "Go to: Settings > LM Studio > API Server"
        return 1
    fi
}

# Function to list loaded models
list_models() {
    echo -e "${YELLOW}Models available in LM Studio:${NC}\n"
    curl -s "${LM_STUDIO_API_BASE}/models" | python3 -m json.tool 2>/dev/null || \
    curl -s "${LM_STUDIO_API_BASE}/models"
}

# Function to chat with model
chat() {
    if [ -z "$1" ]; then
        echo "Usage: $0 chat <model-name> <prompt>"
        exit 1
    fi
    
    model="$1"
    shift
    prompt="$*"
    
    echo -e "${GREEN}Sending request to LM Studio...${NC}\n"
    
    response=$(curl -s "${LM_STUDIO_API_BASE}/chat/completions" \
        -H "Content-Type: application/json" \
        -d "{
            \"model\": \"${model}\",
            \"messages\": [
                {\"role\": \"user\", \"content\": \"${prompt}\"}
            ],
            \"temperature\": 0.7
        }")
    
    echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# Function to generate embeddings
embed() {
    if [ -z "$1" ]; then
        echo "Usage: $0 embed <model-name> <text>"
        exit 1
    fi
    
    model="$1"
    shift
    text="$*"
    
    echo -e "${YELLOW}Generating embeddings...${NC}\n"
    
    response=$(curl -s "${LM_STUDIO_API_BASE}/embeddings" \
        -H "Content-Type: application/json" \
        -d "{
            \"model\": \"${model}\",
            \"input\": \"${text}\"
        }")
    
    echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# Function to test LM Studio integration
test_integration() {
    echo -e "${YELLOW}Testing LM Studio integration...${NC}\n"
    
    # Check connection
    if ! check_connection; then
        exit 1
    fi
    
    # List models
    echo -e "\n${YELLOW}Available models:${NC}"
    list_models
    
    echo -e "\n${GREEN}✓ LM Studio integration test complete${NC}"
}

# Main menu
case "${1:-}" in
    check)
        check_connection
        ;;
    list)
        list_models
        ;;
    chat)
        chat "$2" "$3" "$4" "$5" "$6"
        ;;
    embed)
        embed "$2" "$3" "$4" "$5" "$6"
        ;;
    test)
        test_integration
        ;;
    *)
        echo "Usage: $0 {check|list|chat|embed|test}"
        echo ""
        echo "Commands:"
        echo "  check              Check LM Studio connection"
        echo "  list               List available models"
        echo "  chat <model> <msg> Chat with a model"
        echo "  embed <model> txt  Generate embeddings"
        echo "  test               Test full integration"
        echo ""
        echo "Environment Variables:"
        echo "  LM_STUDIO_HOST     LM Studio host (default: localhost)"
        echo "  LM_STUDIO_PORT     LM Studio port (default: 1234)"
        echo ""
        echo "Make sure LM Studio is running with API server enabled:"
        echo "  Settings > LM Studio > API Server > Enable"
        exit 1
        ;;
esac
