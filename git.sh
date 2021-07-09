#!/bin/bash
git status

read -p "Do you want to push this changes? [y]/n: " -e -i "y" anwser

if [ $anwser == "y" ]
then
  git add .
  read -p "Write the commit message: " message
  git commit -m "${message}"
  read -p "Write the git branch: " branch
  git push origin $branch
fi