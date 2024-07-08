#!/bin/bash

# Input and output files
#LOCAL_DUMP_FILE="db.sql.gz" # ~/nightly/db.sql.gz
LOCAL_DUMP_FILE="/Users/bryce/nightly/db.sql.gz"
MODIFIED_DUMP_FILE="db_modified.sql.gz"
TEMP_DIR=$(mktemp -d)

# Function to handle errors
handle_error() {
    echo "Error on line $1"
    rm -rf "$TEMP_DIR"
    exit 1
}

# Trap errors and call the handle_error function
trap 'handle_error $LINENO' ERR

# Step 1: Gunzip the file
echo "Step 1: Decompressing the SQL dump file..."
gunzip -c "$LOCAL_DUMP_FILE" > "$TEMP_DIR/decompressed_dump.sql"
echo "Step 1: Decompression completed successfully."

# Step 2.1: Remove LOCK TABLES lines
echo "Step 2.1: Removing LOCK TABLES lines..."
LC_ALL=C sed -e '/LOCK TABLES .* WRITE;/d' "$TEMP_DIR/decompressed_dump.sql" > "$TEMP_DIR/modified_dump_step1.sql"
echo "Step 2.1: LOCK TABLES lines removed successfully."

# Step 2.2: Remove lines starting with INSERT INTO cache_
echo "Step 2.2: Removing lines starting with INSERT INTO cache_..."
LC_ALL=C sed -e '/^INSERT INTO `cache_/d' "$TEMP_DIR/modified_dump_step1.sql" > "$TEMP_DIR/modified_dump.sql"
echo "Step 2.2: Lines starting with INSERT INTO cache_ removed successfully."

# Step 3: Gzip the modified content
echo "Step 3: Compressing the modified SQL dump file..."
gzip < "$TEMP_DIR/modified_dump.sql" > "$MODIFIED_DUMP_FILE"
echo "Step 3: Compression completed successfully."

# Optional: Log the modification (Uncomment if needed)
# echo "Logging modifications..."
# LC_ALL=C sed -e '/LOCK TABLES .* WRITE;/d' "$TEMP_DIR/modified_dump.sql" | tee >(logger -t sql_modification) > "$TEMP_DIR/modified_dump_final.sql"

# Clean up temporary files
echo "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"
echo "Cleanup completed successfully."

echo "Script completed successfully."
