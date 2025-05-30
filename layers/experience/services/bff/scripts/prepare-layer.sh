#!/bin/bash

# Simple script to prepare the Prisma Lambda Layer

set -e # Exit immediately if a command exits with a non-zero status.

# Define directories
SERVICE_ROOT=$(pwd)
MONOREPO_ROOT="$SERVICE_ROOT/../../../../"  # Navigate up to the monorepo root
LAYERS_DIR="$SERVICE_ROOT/.layers"
PRISMA_LAYER_DIR="$LAYERS_DIR/prisma"
LAYER_NODEJS_DIR="$PRISMA_LAYER_DIR/nodejs"

echo "Preparing Prisma Lambda Layer..."

# Clean and create layer directory
rm -rf "$PRISMA_LAYER_DIR"
mkdir -p "$LAYER_NODEJS_DIR/node_modules"

# Copy Prisma directories from monorepo root node_modules
echo "Copying Prisma client from monorepo root..."
# copy prisma library from monorepo root
cp -r "$MONOREPO_ROOT/node_modules/@prisma" "$LAYER_NODEJS_DIR/node_modules/"
# copy prisma client from service root - preserve as .prisma
cp -r "$SERVICE_ROOT/node_modules/.prisma" "$LAYER_NODEJS_DIR/node_modules/"
# also copy the @prisma/client directory which contains the generated client
# cp -r "$SERVICE_ROOT/node_modules/.prisma/client" "$LAYER_NODEJS_DIR/node_modules/@prisma/"

echo "Layer preparation complete!" 