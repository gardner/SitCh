#!/bin/bash

# export PATH=$PATH:/var/services/homes/gardner/libwebp-1.2.3-rc1-linux-x86-64/bin
cd "$1"

ls *.JPG 2> /dev/null || exit 0;

for FILENAME in *.JPG; do
    echo "File: $FILENAME"
    echo "---------------"
    for SIZE in 1024 768 640 480 320 240 160; do
        DEST=$(basename "$FILENAME" .JPG)-$SIZE.webp
        if [ ! -e "$DEST" ]; then
            echo "Creating $DEST"
            cwebp -preset photo -m 6 -resize $SIZE 0 -af -q 75 "$FILENAME" -o "$DEST" 2>/dev/null >/dev/null
        fi
    done
done

# Use the above script with this:
# find ParkAsset -type d -print0 | xargs -0 -n1 -P3 ./convert.sh
#

# resizeImage() {
#     SIZE=$1
#     IMAGE=$2
#     if [ ! -e "./$SIZE/$IMAGE" ]; then
#         DEST=$SIZE/$(dirname "$IMAGE")
#         mkdir -p "$DEST"
#         # convert "$IMAGE" -quality 75 -resize $SIZE "./$SIZE/$IMAGE"
#         /var/services/homes/gardner/libwebp-1.2.3-rc1-linux-x86-64/bin/cwebp -preset photo -m 6 "$IMAGE" -o in_file "$IMAGE.webp"
#     fi
# }
# resizeImage 640 "$1"
# resizeImage 100 "$1"

# resizeImage 1024 "$1"
# resizeImage 780 "$1"
# resizeImage 480 "$1"
# resizeImage 320 "$1"
# resizeImage 200 "$1"

# -qrange



# mkdir -p "$DEST"
# ls -lah "$DEST"


# DEST=348/$(dirname "$1")
# mkdir -p "$DEST"
# ls -lah "$DEST"
# convert "$1" -quality 75 -resize 348 "./348/$1"

# find ./Image -type f -name \*.jpg -exec ~/convert.sh "{}" \;
# mv Image/ManMade/ParkAsset/* ./

# DEST=640/$(dirname "$1")
# mkdir -p "$DEST"
# ls -lah "$DEST"
# convert "$1" -quality 75 -resize 640 "./640/$1"

# DEST=100/$(dirname "$1")
# mkdir -p "$DEST"
# ls -lah "$DEST"
# convert "$1" -quality 75 -resize 100 "./100/$1"


# DEST=1024/$(dirname "$1")
# mkdir -p "$DEST"
# ls -lah "$DEST"
# convert "$1" -quality 75 -resize 1024 "./1024/$1"

# DEST=200/$(dirname "$1")
# mkdir -p "$DEST"
# ls -lah "$DEST"
# convert "$1" -quality 75 -resize 200 "./200/$1"


# wget \
#     --wait=1 \
#     --no-host-directories \
#     --force-directories \
#     --base=https://gismap.ccc.govt.nz/Image/ManMade/ParkAsset/ \
#     --input-file=../loadCache2.txt


# mkdir -p 1024

# find ./ -type f -name \*.jpg -exec echo convert "{}" -quality 75 -resize 1024 "./1024/{}" \;
# `find ./ -type f -name \*.jpg \( -exec echo mkdir $(basename "{}") \; -a -exec echo mkdir $(dirname "{}") \;  \)


# wget \
# --wait=1 \
# --no-host-directories \
# --force-directories \
# --base=https://gismap.ccc.govt.nz/Image/ManMade/ParkAsset/ \
# --input-file=/var/services/homes/gardner/loadCache2.txt
