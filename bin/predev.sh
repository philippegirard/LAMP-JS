#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")/.."

# Check if .env file exists
if [ ! -f .env ]; then
    echo ".env file not found. Copying from .env.template..."
    cp .env.template .env
    echo ".env file created successfully."
fi