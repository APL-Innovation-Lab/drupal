#!/bin/sh

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
. venv/bin/activate

# Install required packages
pip install requests beautifulsoup4

# Run the Python script
python3 missing.py
