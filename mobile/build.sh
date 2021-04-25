# yarn jetify
yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd ./android
if [ $1 == "apk" ]; then
    bash ./gradlew clean app:assembleRelease -x bundleReleaseJsAndAssets
    cp app/build/outputs/apk/release/app-release.apk ~/Desktop/SVO.apk
else
    bash ./gradlew clean app:bundleRelease -x bundleReleaseJsAndAssets
fi
