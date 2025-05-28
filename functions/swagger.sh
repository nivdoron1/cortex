#!/bin/bash

# Ensure OpenAPI Generator CLI is installed
if ! command -v openapi-generator-cli &> /dev/null
then
    echo "OpenAPI Generator CLI is not installed. Installing now..."
    npm install -g @openapitools/openapi-generator-cli
fi

# Define input and output paths
SWAGGER_FILE="./swagger.yaml"
OUTPUT_DIR="../frontend/app/api"

# Run OpenAPI Generator
echo "Generating TypeScript API client from $SWAGGER_FILE..."
openapi-generator-cli generate -i $SWAGGER_FILE -g typescript-axios -o $OUTPUT_DIR

# Check if generation was successful
if [ $? -eq 0 ]; then
    echo "✅ API client successfully generated in $OUTPUT_DIR"
else
    echo "❌ Failed to generate API client"
    exit 1
fi
