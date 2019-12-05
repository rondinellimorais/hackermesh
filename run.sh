#!/bin/bash

LANGUAGES=(
    java7
    python
    cpp
    bash
    c
    ruby
)

for i in ${!LANGUAGES[@]}; do 
    LANGUAGE=${LANGUAGES[$i]}
osascript <<END 
    tell application "Terminal"
        do script "node $(pwd)/index.js -l ${LANGUAGE} -p 909${i}"
    end tell
END
done

