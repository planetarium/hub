#!/bin/bash

# Function to validate JSON files in data/mods
validate_mods() {
  for file in data/mods/*.json; do
    filename=$(basename -- "$file")
    IFS='.' read -r owner mod_name ext <<< "$filename"

    if [[ "$ext" != "json" || -z "$mod_name" ]]; then
      echo "File $filename does not follow {owner}.{mod_name}.json format"
      exit 1
    fi

    # Read JSON file
    content=$(cat "$file")
    id=$(echo "$content" | jq -r '.id')
    title=$(echo "$content" | jq -r '.title')
    developer=$(echo "$content" | jq -r '.developer')
    summary=$(echo "$content" | jq -r '.summary')
    githubLink=$(echo "$content" | jq -r '.githubLink')
    thumbnailExists=$(echo "$content" | jq -r '.thumbnailExists')
    tags=$(echo "$content" | jq -r '.tags[]')

    # Length checks
    if [ "${#id}" -gt 30 ] || [ "${#title}" -gt 20 ] || [ "${#developer}" -gt 15 ] || [ "${#summary}" -gt 120 ]; then
      echo "Validation failed for lengths in $filename"
      exit 1
    fi

    # GitHub link validation
    if [[ ! "$githubLink" =~ ^https://github.com/ ]]; then
      echo "Invalid GitHub link in $filename"
      exit 1
    fi

    # Validate tags
    valid_tags=$(cat data/tags.json | jq -r '.[]')
    for tag in $tags; do
      if [[ ! "$valid_tags" =~ "$tag" ]]; then
        echo "Invalid tag $tag in $filename"
        exit 1
      fi
    done

    # Check for thumbnail existence
    if [[ "$thumbnailExists" == "true" && ! -f "public/images/$id.jpg" ]]; then
      echo "Thumbnail for $id missing in public/images"
      exit 1
    fi
  done
}

# Validate tags.json format
validate_tags() {
  tags=$(cat data/tags.json | jq -r '.[]')
  for tag in $tags; do
    if [ "${#tag}" -gt 10 ]; then
      echo "Tag $tag in tags.json exceeds 10 characters"
      exit 1
    fi
  done
}

validate_mods
validate_tags

echo "All validations passed!"
